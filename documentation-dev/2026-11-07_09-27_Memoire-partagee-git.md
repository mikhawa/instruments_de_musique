# Mise en place d'une mémoire partagée via git

- **Date** : 2026-11-07
- **Branche** : feature/01-install-claude

## Agents intervenus

| Agent | Niveau |
|-------|--------|
| Agent principal | opus |

## Fichier(s) modifié(s)

- `.claude/memoire/README.md` — créé : fonctionnement, format, règles
- `.claude/memoire/MEMORY.md` — créé : index des mémoires
- `.claude/memoire/utilisateur-profil.md` — créé : première mémoire
- `CLAUDE.md` — modifié : section « Mémoire partagée » + import `@.claude/memoire/MEMORY.md`

## Résumé des changements

- La mémoire de Claude est désormais un dossier versionné du dépôt au lieu de `~/.claude/projects/.../memory/` (local à un poste).
- L'index est importé dans `CLAUDE.md`, donc chargé automatiquement sur chaque poste après `git pull`.

## Raison

L'utilisateur travaille sur plusieurs postes et veut que Claude conserve le même contexte partout.

## Message de commit proposé

```
chore: ajout d'une mémoire Claude partagée via git
```
