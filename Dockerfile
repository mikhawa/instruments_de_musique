# syntax=docker/dockerfile:1
# Images du projet : cibles "dev" et "prod" (PHP 8.4, imposé par composer.lock).

FROM php:8.4-fpm-alpine AS base
COPY --from=ghcr.io/mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions intl pdo_mysql opcache zip
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html

FROM base AS vendor
COPY composer.json composer.lock symfony.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-progress

# Développement : code monté en volume, dépendances installées au 1er démarrage
FROM base AS dev
ENV APP_ENV=dev
COPY docker/php/entrypoint-dev.sh /usr/local/bin/entrypoint-dev
ENTRYPOINT ["entrypoint-dev"]
CMD ["php-fpm"]

# Production : code embarqué, sans dépendances de dev
FROM base AS prod
ENV APP_ENV=prod
COPY --from=vendor /var/www/html/vendor ./vendor
COPY . .
RUN composer dump-autoload --no-dev --classmap-authoritative \
    && php bin/console importmap:install \
    && php bin/console asset-map:compile \
    && mkdir -p var && chown -R www-data:www-data var
USER www-data
CMD ["php-fpm"]
