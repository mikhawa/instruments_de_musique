# Docker (développement)

## État actuel

- `compose.yaml` : service `database` = **MariaDB 11.4** (image `mariadb:11.4`, volume `database_data` monté sur `/var/lib/mysql`, healthcheck `healthcheck.sh --connect --innodb_initialized`). Les marqueurs de recette Flex `###> doctrine/doctrine-bundle ###` sont conservés.
- `compose.override.yaml` : expose la base sur le port hôte **3307** (`3307:3306`) et ajoute Mailpit (ports aléatoires).
- Variables (valeurs par défaut) : `MARIADB_DATABASE=app`, `MARIADB_USER=app`, `MARIADB_PASSWORD=!ChangeMe!`, `MARIADB_ROOT_PASSWORD=!ChangeMe!`. Ces valeurs sont réservées au développement ; en production, les secrets passent par `.env.local` côté serveur / GitHub Secrets.
- `.env` : `DATABASE_URL="mysql://app:!ChangeMe!@127.0.0.1:3307/app?serverVersion=11.4.0-MariaDB&charset=utf8mb4"`.
- `config/packages/doctrine.yaml` : retrait de `identity_generation_preferences` (PostgreSQL) ; la version du serveur est donnée par `serverVersion` dans `DATABASE_URL`.

### Pourquoi 3307 et pas 3306 ?

Sur certains postes WSL, un MySQL/MariaDB local écoute déjà sur `127.0.0.1:3306` et intercepte la connexion (erreur `Access denied for user 'app'@'localhost'`). Le port hôte 3307 évite ce conflit. Si 3306 est libre chez vous, vous pouvez le remettre dans `compose.override.yaml` et `DATABASE_URL`.

## Commandes

```bash
docker compose up -d
docker compose ps                      # attendre l'état "healthy"
php bin/console dbal:run-sql "SELECT VERSION()"
php bin/console doctrine:database:create --if-not-exists
docker compose down                    # sans -v : conserve les données
```

Vérifié le 2026-11-07 : `SELECT VERSION()` renvoie `11.4.10-MariaDB-ubu2404`.

## Prérequis

Extension PHP `pdo_mysql` (Ubuntu/WSL : `sudo apt install php8.4-mysql`). Elle est présente sur ce poste.
