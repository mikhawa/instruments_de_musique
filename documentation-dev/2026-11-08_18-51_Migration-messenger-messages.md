# Migration de la table messenger_messages

- **Date** : 2026-11-08 18:51
- **Branche** : feature/05-database

## Agents intervenus

| Agent | Niveau |
|-------|--------|
| Agent principal (orchestration, relecture) | opus |
| migrations | sonnet |
| verificateur | haiku |
| redacteur-docs | haiku |

## Fichier(s) modifié(s)

- `migrations/Version20261108174951.php` — créé
- `docs/architecture/database-schema.md` — modifié (section « Tables techniques » ajoutée)

## Résumé des changements

- Migration `Version20261108174951` :
  - `up` : création de la table `messenger_messages` (id BIGINT AUTO_INCREMENT, body LONGTEXT, headers LONGTEXT, queue_name VARCHAR(190), created_at, available_at, delivered_at NULL, index composite sur queue_name / available_at / delivered_at / id).
  - `down` : suppression de la table (`DROP TABLE`).
- Documentation du schéma : section « Tables techniques » ajoutée dans `docs/architecture/database-schema.md`.
- Actions en base de dev (aucun fichier créé) :
  - création de la table `doctrine_migration_versions` (`doctrine:migrations:sync-metadata-storage`) ;
  - migration marquée comme exécutée (`doctrine:migrations:version --add`), la table existant déjà (auto_setup=1 en dev) ;
  - base temporaire `app_migration_tmp` créée pour le diff et le test, puis supprimée ;
  - droit GRANT résiduel de l'utilisateur applicatif sur cette base révoqué.
- Vérifications :
  - SQL généré identique au `SHOW CREATE TABLE` de la base de dev ;
  - test sur base vide : up, puis down, puis up, OK ;
  - `php -l`, `lint:container`, `lint:yaml`, `lint:twig` OK ;
  - `doctrine:schema:validate` : mapping et base OK ;
  - `doctrine:migrations:status` : 1 exécutée, 0 nouvelle ;
  - `doctrine:migrations:migrate --dry-run` : « Already at the latest version » ;
  - `messenger:stats` OK ;
  - accès `:8080` : 404 attendu (pas de route racine encore définie) ;
  - PHPUnit : aucun test existant, rien à exécuter.

## Raison

- Le choix de l'utilisateur est une table Messenger uniquement, sans entité métier pour l'instant.
- En production (Hostinger), `auto_setup` vaut 0 : la table `messenger_messages` doit donc être créée par une migration, exécutée au déploiement avec `doctrine:migrations:migrate -n`.

## Points ouverts

- Mettre en place le worker Messenger en production (cron ou supervisor).
- Écrire les premiers tests PHPUnit (agent testeur).
- Installer php-cs-fixer et phpstan (non installés actuellement).

## Message de commit proposé

```
feat: migration de la table messenger_messages
```
