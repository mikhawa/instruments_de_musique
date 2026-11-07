# Création des fichiers de configuration Claude Code

- **Date** : 2026-11-07 09:17
- **Branche** : feature/01-install-claude

## Agents intervenus

| Agent | Niveau |
|-------|--------|
| Agent principal (pas de sous-agent : les agents n'existaient pas encore) | opus |

## Fichier(s) modifié(s)

- `.claude/models.md` — créé : règles de choix des sous-agents
- `.claude/agents/*.md` — créés : 11 sous-agents (verificateur, redacteur-docs, admin-crud, dev-api, dev-react, migrations, testeur, devops, architecte, auditeur-securite, debogueur)
- `documentation-dev/_modele.md` — créé : modèle des fiches de suivi
- `docs/architecture/overview.md`, `docs/architecture/database-schema.md`, `docs/architecture/decisions/0001-stack-technique.md` — créés (squelettes)
- `docs/devops/docker-setup.md`, `docs/devops/github-actions.md` — créés (squelettes)

## Résumé des changements

- Mise en place de l'organisation multi-agents décrite dans `CLAUDE.md` (haiku / sonnet / opus).
- Création de la documentation de référence citée dans `CLAUDE.md`, à compléter au fil du projet.

## Raison

`CLAUDE.md` référence `.claude/agents/`, `.claude/models.md`, `documentation-dev/` et `docs/` qui n'existaient pas encore.

## Points à trancher

- `.claude/settings.json` (interdiction de commit/push/branche) : proposé mais non créé, à ajouter manuellement.
- `compose.yaml` et `DATABASE_URL` sont encore en PostgreSQL 16 alors que la cible est MariaDB 11.4 (à confier à `devops` + `migrations`).
- `.php-version` indique 8.4 alors que la production est en PHP 8.3.
- L'agent `dev-react` est configuré pour Twig/Stimulus/Turbo : React n'est pas installé (AssetMapper, pas de Node).

## Message de commit proposé

```
chore: ajout de la configuration Claude Code (agents, modèles, documentation)
```
