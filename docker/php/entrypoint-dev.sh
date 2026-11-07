#!/bin/sh
# Dev : installe les dépendances au premier démarrage, puis lance PHP-FPM.
set -e
if [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction --prefer-dist
fi
exec "$@"
