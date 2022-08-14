FROM alpine:latest

ARG POM_VERSION
RUN mkdir -p /var/www/admin

ADD ./target/app-ican-admin-$POM_VERSION.tar.gz /var/www/admin/

VOLUME ["admin"]
