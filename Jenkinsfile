#!groovy
@Library('shared-library@master') _

pipeline {
    environment {
        registry = "187694512866.dkr.ecr.eu-central-1.amazonaws.com/"
        master_branch_name = "master"
        develop_branch_name = "3.7.X"
        docker_image_name = "d2hub-admin"
    }

    agent none
    parameters {

        choice(name: 'PROFILE',
                choices: ['artifactory'],
                description: 'Select the maven profile used to deploy artifact')

        booleanParam(name: "LDAP",
                description: "Active LDAP profile.",
                defaultValue: false)

        booleanParam(name: "RC",
                description: "Build a release candidate from current commit.",
                defaultValue: false)

        booleanParam(name: "PROD",
                description: "Build a release.",
                defaultValue: false)

        booleanParam(name: "CLEAN_WORKSPACE",
                description: "Clean workspace.",
                defaultValue: false)

    }
    stages {

        stage('Clean workspace') {
            when {
                allOf {
                    expression { params.CLEAN_WORKSPACE }
                }
            }
            agent {
                label 'IV-DEB-JENKINS-SLAVE-01'
            }
            steps {
                deleteDir()
            }
        }
        stage('Create passwd') {
            agent {
                label 'IV-DEB-JENKINS-SLAVE-01'
            }
            steps {
                sh """echo \$USER:x:\$(id -u):\$(id -g):,,,:\$WORKSPACE:/bin/bash > /tmp/${docker_image_name}_${env.BRANCH_NAME}_tmp_passwd
            """
            }
        }

        stage('Compile') {
            when {
                allOf {
                    branch develop_branch_name
                    not {
                        expression { params.PROD }
                    }
                    not {
                        expression { params.RC }
                    }
                }
            }
            agent {
                docker {
                    image 'devayansarkar/maven-node-openjdk:latest'
                    registryUrl 'https://index.docker.io/v1/'
                }
            }
            environment {
                // Override HOME to WORKSPACE
                HOME = "${WORKSPACE}"
                // or override default cache directory (~/.npm)
                NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
                ARTIFACTORY_CREDENTIALS = credentials('a9781bbf-5748-4f7d-8f05-0c7905eac06b')
            }
            steps {
                configFileProvider([
                        configFile(fileId: 'd2hub-global-maven-settings', variable: 'MAVEN_GLOBAL_SETTINGS')
                ]) {
                    sh "mvn -gs $MAVEN_GLOBAL_SETTINGS -Dartifactory.username=$ARTIFACTORY_CREDENTIALS_USR -Dartifactory.password=$ARTIFACTORY_CREDENTIALS_PSW -Dldap.enabled=" + params.LDAP + " clean site:jar deploy -Pprod," + params.PROFILE
                }
            }
        }
        stage('Build docker image') {
            when {
                allOf {
                    branch develop_branch_name
                    not {
                        expression { params.PROD }
                    }
                    not {
                        expression { params.RC }
                    }
                }
            }
            agent {
                label 'IV-DEB-JENKINS-SLAVE-01'
            }
            steps {
                script {
                    pom = readMavenPom file: 'pom.xml'
                    app = docker.build(registry + docker_image_name + ":" + pom.version, "--build-arg POM_VERSION=" + pom.version + " .")
                }
            }
        }
        stage('Push image to ECR with tag TEST') {
            when {
                allOf {
                    branch develop_branch_name
                    not {
                        expression { params.PROD }
                    }
                    not {
                        expression { params.RC }
                    }
                }
            }
            agent {
                label 'IV-DEB-JENKINS-SLAVE-01'
            }
            steps {
                script {
                    docker.withRegistry('https://' + registry, 'ecr:eu-central-1:d2hub-aws-ecr-credentials') {
                        app.push()
                        app.push('TEST')
                    }
                    sh "docker rmi $registry$docker_image_name:TEST"
                    sh "docker rmi $registry$docker_image_name:$pom.version"
                }
            }
        }

        stage('Compile Release Candidate') {
            when {
                allOf {
                    branch master_branch_name
                    expression { params.RC }
                    not {
                        expression { params.PROD }
                    }
                }
            }
            agent {
                dockerfile {
                    filename 'Dockerfile-maven-node'
                    label 'IV-DEB-JENKINS-SLAVE-01'
                    registryUrl 'https://index.docker.io/v1/'
                    additionalBuildArgs '--build-arg USER_ID=$(id -u) --build-arg GROUP_ID=$(id -g)'
                    args "-v /tmp/${docker_image_name}_${env.BRANCH_NAME}_tmp_passwd:/etc/passwd"
                }
            }
            environment {
                // Override HOME to WORKSPACE
                HOME = "${WORKSPACE}"
                // or override default cache directory (~/.npm)
                NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
                ARTIFACTORY_CREDENTIALS = credentials('a9781bbf-5748-4f7d-8f05-0c7905eac06b')
                GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
            }
            steps {
                configFileProvider([
                        configFile(fileId: 'd2hub-global-maven-settings', variable: 'MAVEN_GLOBAL_SETTINGS')
                ]) {

                    sshagent(credentials: ['52ffde3c-7d82-414a-aa79-c73c3d5bd7b3']) {

                        sh 'git checkout ' + BRANCH_NAME
                        sh 'git pull'
                        script {

                            def pom = readMavenPom file: 'pom.xml'

                            rcVersion = pom.version
                            rcVersion = rcVersion.replace('-SNAPSHOT', '')

                            def rcIndex = rcVersion.lastIndexOf('RC')
                            if (rcIndex == -1) {
                                rcVersion = rcVersion + '-RC1'
                            }

                            echo rcVersion

                        }

                        sh 'mvn -gs $MAVEN_GLOBAL_SETTINGS -B -DreleaseVersion=' + rcVersion + ' release:prepare -Darguments="-Dartifactory.username=$ARTIFACTORY_CREDENTIALS_USR -Dartifactory.password=$ARTIFACTORY_CREDENTIALS_PSW -Dldap.enabled=' + params.LDAP + ' -Pprod,' + params.PROFILE + '" release:perform -Dgoals="site:jar deploy" -Darguments="-Dartifactory.username=$ARTIFACTORY_CREDENTIALS_USR -Dartifactory.password=$ARTIFACTORY_CREDENTIALS_PSW -Dldap.enabled=' + params.LDAP + ' -Pprod,' + params.PROFILE + '"'
                        sh "git checkout " + env.develop_branch_name
                        sh "git merge " + env.master_branch_name
                        sh "git push"
                    }
                }
            }
        }
        stage('Build docker image Release Candidate') {
            when {
                allOf {
                    branch master_branch_name
                    expression { params.RC }
                    not {
                        expression { params.PROD }
                    }
                }
            }
            agent {
                label 'IV-DEB-JENKINS-SLAVE-01'
            }
            steps {
                script {
                    echo rcVersion
                    app = docker.build(registry + docker_image_name + ":" + rcVersion, "--build-arg POM_VERSION=" + rcVersion + " .")
                }
            }

        }
        stage('Push image to ECR with tag RC') {
            when {
                allOf {
                    branch master_branch_name
                    expression { params.RC }
                    not {
                        expression { params.PROD }
                    }
                }
            }
            agent {
                label 'IV-DEB-JENKINS-SLAVE-01'
            }
            steps {
                script {
                    docker.withRegistry('https://' + registry, 'ecr:eu-central-1:d2hub-aws-ecr-credentials') {
                        app.push()
                        app.push('RC')
                    }
                    sh "docker rmi $registry$docker_image_name:RC"
                    sh "docker rmi $registry$docker_image_name:$rcVersion"
                }
            }
        }

        stage('Compile Release') {
            when {
                allOf {
                    branch master_branch_name
                    expression { params.PROD }
                    not {
                        expression { params.RC }
                    }
                }
            }
            agent {
                dockerfile {
                    filename 'Dockerfile-maven-node'
                    label 'IV-DEB-JENKINS-SLAVE-01'
                    registryUrl 'https://index.docker.io/v1/'
                    additionalBuildArgs '--build-arg USER_ID=$(id -u) --build-arg GROUP_ID=$(id -g)'
                    args "-v /tmp/${docker_image_name}_${env.BRANCH_NAME}_tmp_passwd:/etc/passwd"
                }
            }
            environment {
                // Override HOME to WORKSPACE
                HOME = "${WORKSPACE}"
                // or override default cache directory (~/.npm)
                NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
                ARTIFACTORY_CREDENTIALS = credentials('a9781bbf-5748-4f7d-8f05-0c7905eac06b')
                GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
            }
            steps {
                configFileProvider([
                        configFile(fileId: 'd2hub-global-maven-settings', variable: 'MAVEN_GLOBAL_SETTINGS')
                ]) {

                    sshagent(credentials: ['52ffde3c-7d82-414a-aa79-c73c3d5bd7b3']) {

                        sh 'git checkout ' + BRANCH_NAME
                        sh 'git pull'
                        script {

                            def pom = readMavenPom file: 'pom.xml'

                            releaseVersion = pom.version
                            releaseVersion = releaseVersion.replace('-SNAPSHOT', '')

                            def rcIndex = releaseVersion.lastIndexOf('-RC');
                            if (rcIndex != -1) {
                                releaseVersion = releaseVersion.substring(0, rcIndex);
                            }

                            echo releaseVersion

                        }

                        sh 'mvn -gs $MAVEN_GLOBAL_SETTINGS -B -DreleaseVersion=' + releaseVersion + ' release:prepare -Darguments="-Dartifactory.username=$ARTIFACTORY_CREDENTIALS_USR -Dartifactory.password=$ARTIFACTORY_CREDENTIALS_PSW -Dldap.enabled=' + params.LDAP + ' -Pprod,' + params.PROFILE + '" release:perform -Dgoals="site:jar deploy" -Darguments="-Dartifactory.username=$ARTIFACTORY_CREDENTIALS_USR -Dartifactory.password=$ARTIFACTORY_CREDENTIALS_PSW -Dldap.enabled=' + params.LDAP + ' -Pprod,' + params.PROFILE + '"'
                        sh "git checkout " + env.develop_branch_name
                        sh "git merge " + env.master_branch_name
                        sh "git push"
                    }
                }
            }
        }
        stage('Build docker image PROD') {
            when {
                allOf {
                    branch master_branch_name
                    expression { params.PROD }
                    not {
                        expression { params.RC }
                    }
                }
            }
            agent {
                label 'IV-DEB-JENKINS-SLAVE-01'
            }
            steps {
                script {
                    echo releaseVersion
                    app = docker.build(registry + docker_image_name + ":" + releaseVersion, "--build-arg POM_VERSION=" + releaseVersion + " .")
                }
            }

        }
        stage('Push image to ECR with tag PROD') {
            when {
                allOf {
                    branch master_branch_name
                    expression { params.PROD }
                    not {
                        expression { params.RC }
                    }
                }
            }
            agent { label 'IV-DEB-JENKINS-SLAVE-01' }
            steps {
                script {
                    docker.withRegistry('https://' + registry, 'ecr:eu-central-1:d2hub-aws-ecr-credentials') {
                        app.push()
                        app.push('PROD')
                    }
                    sh "docker rmi $registry$docker_image_name:PROD"
                    sh "docker rmi $registry$docker_image_name:$releaseVersion"
                }
            }
        }

    }
    post {
        failure {
            emailext(
                    subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                    body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                       <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${
                        env.BUILD_NUMBER
                    }]</a>&QUOT;</p>""",
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
}
