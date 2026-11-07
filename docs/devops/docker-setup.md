# Docker (développement)

> À compléter par l'agent `devops`.

## État actuel

`compose.yaml` contient encore le service PostgreSQL 16 généré par Symfony ; `compose.override.yaml` ajoute Mailpit.

## Cible

- Service `database` : MariaDB 11.4 (healthcheck, volume persistant).
- `DATABASE_URL` à placer dans `.env.local` :
  `mysql://app:!ChangeMe!@127.0.0.1:3306/app?serverVersion=11.4.0-MariaDB&charset=utf8mb4`
- Mailpit pour intercepter les e-mails.

## Commandes

```bash
docker compose up -d
docker compose ps
docker compose down
```
