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
