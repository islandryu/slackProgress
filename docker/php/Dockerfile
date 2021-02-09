FROM php:7.4-fpm
SHELL ["/bin/bash","-c"]

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_NO_INTERACTION 1
COPY ./php.ini /usr/local/etc/php/php.ini

RUN apt-get update && \
    apt-get -y install git unzip libzip-dev libicu-dev libonig-dev npm && \
    docker-php-ext-install intl pdo_mysql zip bcmath && \
    npm i -g n && \
    n latest && \
    PATH="$PATH" && \
    pecl install xdebug && \
    docker-php-ext-enable xdebug 

WORKDIR /work