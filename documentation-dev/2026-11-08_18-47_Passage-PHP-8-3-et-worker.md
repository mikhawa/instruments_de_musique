# Passage PHP 8.3 et ajout du worker Messenger

- **Date** : 2026-11-08 18:47
- **Branche** : feature/01-install-claude

## Agents intervenus

| Agent | Niveau |
|-------|--------|
| Agent principal (orchestration, relecture) | opus |
| devops (2 passages) | sonnet |
| verificateur | haiku |
| redacteur-docs | haiku |

## Fichier(s) modifié(s)

- `CLAUDE.md` — modifié (ajout de `designer` à la liste des agents Sonnet)
- `composer.json` — modifié (`php >=8.3`, `config.platform.php = 8.3.0`, contraintes assouplies)
- `composer.lock` — modifié (paquets rétrogradés pour compatibilité PHP 8.3)
- `Dockerfile` — modifié (base `php:8.3-fpm-alpine`)
- `.php-version` — modifié (8.3)
- `compose.yaml` — modifié (service `worker` Messenger ; `MESSENGER_TRANSPORT_DSN` avec `auto_setup=1` en dev)
- `docker/nginx/default.conf` — modifié (résolveur Docker et `fastcgi_pass` via variable `$php_upstream`)
- `.claude/agents/testeur.md` — modifié (PHPUnit 13 → 12)
- `README.md` — modifié (PHP 8.3, worker, résolveur nginx)
- `docs/devops/docker-setup.md` — modifié (PHP 8.3, worker, résolveur nginx)
- `docs/architecture/decisions/0001-stack-technique.md` — modifié (PHP 8.3, worker, résolveur nginx)

## Résumé des changements

- Passage de PHP 8.3 partout : image Docker, `.php-version`, `composer.json` (plateforme figée à 8.3.0) et documentation.
- Rétrogradation de dépendances compatibles PHP 8.3 :
  - doctrine/doctrine-bundle 3.3.4 → 2.19.3
  - doctrine/doctrine-migrations-bundle 4.0.1 → 3.7.1
  - doctrine/collections 3.1.0 → 2.6.0
  - doctrine/instantiator 2.1.0 → 2.0.0
  - symfony/stimulus-bundle 3.7.0 → 2.36.0
  - symfony/ux-turbo 3.7.0 → 2.36.0
  - phpunit/phpunit 13.4.6 → 12.5.43 (et dépendances phpunit/* et sebastian/* associées)
- Ajout du service `worker` dans `compose.yaml` : `messenger:consume async` avec `--time-limit=3600` et `--memory-limit=128M`, redémarrage `unless-stopped`.
- `MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=1` en dev uniquement (le `.env` garde `auto_setup=0`).
- Correction d'un 502 nginx : nginx conservait l'ancienne IP du conteneur php après recréation. Ajout de `resolver 127.0.0.11 valid=10s ipv6=off;` et utilisation de la variable `$php_upstream` pour `fastcgi_pass`.

### Vérifications effectuées

- PHP 8.3.36 confirmé dans le conteneur.
- `composer validate` et `composer check-platform-reqs` : OK.
- `lint:container`, `lint:yaml`, `lint:twig`, `doctrine:schema:validate` : OK.
- Aucune dépréciation détectée.
- E-mail de test traité par le worker et reçu dans Mailpit.
- `:8080` répond 404 « Welcome to Symfony », y compris après recréation du conteneur php sans redémarrer web.
- PHPUnit : aucun test existant pour le moment.

## Raison

- La production Hostinger tourne en PHP 8.3 : l'environnement de dev doit être aligné.
- Les e-mails passent par Messenger en mode asynchrone et nécessitent un worker pour être envoyés.
- Le résolveur nginx évite les 502 après recréation du conteneur php.
- Décisions de l'utilisateur : PHP 8.3 partout (dev et prod), ajout de `designer` aux agents Sonnet, ajout d'un worker Messenger.

## Points ouverts

1. **Production** : créer la table `messenger_messages` (migration ou `messenger:setup-transports` au déploiement).
2. **Production** : mettre en place le worker Messenger sur Hostinger (cron ou supervisor).
3. Les futures montées de version de doctrine-bundle, stimulus-bundle, ux-turbo et PHPUnit sont bloquées par la plateforme PHP 8.3 (choix voulu).
4. Écrire les premiers tests (agent testeur).

## Message de commit proposé

```
chore: passage en PHP 8.3, ajout du worker Messenger et de l'agent designer
```
