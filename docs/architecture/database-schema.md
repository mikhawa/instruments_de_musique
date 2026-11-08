# Schéma de la base de données

> Aucune entité n'existe encore. Ce document est tenu à jour par l'agent `migrations`.

## Proposition initiale (à valider par `architecte`)

```
famille (id, nom, slug UNIQUE, histoire TEXT, image, created_at, updated_at)
instrument (id, famille_id FK, nom, slug UNIQUE, presentation TEXT, image, son, created_at, updated_at)
modele (id, instrument_id FK, nom, slug, presentation TEXT, image, son, created_at, updated_at)
        UNIQUE (instrument_id, slug)
```

- Les images et les sons sont stockés comme fichiers ; la base ne contient que leur chemin.
- Moteur : MariaDB 11.4, `utf8mb4`.

## Tables techniques

### `messenger_messages`

Table du transport Messenger Doctrine (`MESSENGER_TRANSPORT_DSN=doctrine://default`). Elle stocke les messages asynchrones en attente de traitement par le worker. Elle n'est liée à aucune entité métier.

| Colonne | Type | Remarques |
|---|---|---|
| `id` | BIGINT AUTO_INCREMENT | clé primaire |
| `body` | LONGTEXT | message sérialisé |
| `headers` | LONGTEXT | en-têtes (JSON) |
| `queue_name` | VARCHAR(190) | nom de la file |
| `created_at` | DATETIME | création |
| `available_at` | DATETIME | date de disponibilité |
| `delivered_at` | DATETIME NULL | prise en charge par un worker |

Index : `IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750` sur (`queue_name`, `available_at`, `delivered_at`, `id`).

Création : migration `DoctrineMigrations\Version20261108174951`. En dev, `auto_setup=1` (compose.yaml) l'avait déjà créée : la migration y a été marquée exécutée sans rejouer le CREATE. En production (`auto_setup=0`), la migration crée la table.
