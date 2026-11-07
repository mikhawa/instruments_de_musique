# GitHub Actions

> À compléter par l'agent `devops`. Aucun workflow n'existe encore.

## Cible

1. **CI** (sur push et pull request) : PHP 8.3, `composer install`, lints (`lint:container`, `lint:yaml`, `lint:twig`), PHPUnit avec un service MariaDB 11.4.
2. **Déploiement** (sur `main`) : SSH vers le VPS Hostinger, puis
   `composer install --no-dev --optimize-autoloader`, `importmap:install`, `asset-map:compile`,
   `doctrine:migrations:migrate -n`, `cache:clear --env=prod`.

## Secrets nécessaires

`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_PORT`, chemin de déploiement. Le `.env.local` de production reste sur le serveur.
