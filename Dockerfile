FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-scripts \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader

FROM node:24-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY resources ./resources
COPY public ./public
COPY vite.config.js tsconfig.json postcss.config.js tailwind.config.js ./
RUN npm run build

FROM php:8.3-cli-alpine
WORKDIR /var/www/html

RUN apk add --no-cache \
    bash \
    icu-data-full \
    icu-libs \
    libzip \
    sqlite-libs \
    oniguruma \
    unzip \
    && apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    icu-dev \
    libzip-dev \
    sqlite-dev \
    && docker-php-ext-install -j"$(nproc)" \
    bcmath \
    intl \
    opcache \
    pdo_mysql \
    pdo_pgsql \
    pdo_sqlite \
    zip \
    && apk del .build-deps

COPY --from=vendor /app/vendor ./vendor
COPY . .
COPY --from=frontend /app/public/build ./public/build

RUN chmod +x ./docker/start.sh \
    && php artisan package:discover --ansi \
    && mkdir -p /data \
    && touch /data/database.sqlite \
    && chown -R www-data:www-data /var/www/html /data

USER www-data
EXPOSE 8080
CMD ["./docker/start.sh"]
