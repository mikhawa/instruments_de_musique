# Mémoire partagée de Claude

Ce dossier remplace la mémoire locale de Claude Code (`~/.claude/projects/.../memory/`), qui reste sur un seul poste.
Il est **versionné avec git** : la mémoire suit le dépôt sur tous les postes (`git pull` pour la récupérer).

## Fonctionnement

- `MEMORY.md` est l'index, chargé automatiquement à chaque session via `CLAUDE.md` (`@.claude/memoire/MEMORY.md`).
- Une mémoire = un fichier `.md` dans ce dossier, référencé par **une ligne** dans `MEMORY.md`.
- Claude lit le détail d'un fichier seulement quand il est utile à la tâche.

## Format d'un fichier

```markdown
---
name: nom-en-kebab-case
description: résumé en une ligne (sert à décider si la mémoire est pertinente)
type: utilisateur | retour | projet | reference
---

Le fait à retenir.
**Pourquoi :** la raison (pour `retour` et `projet`).
**Application :** quand et comment l'appliquer.
Liens vers d'autres mémoires : [[autre-nom]].
```

| Type | Contenu |
|------|---------|
| `utilisateur` | Qui est l'utilisateur, ses préférences, son niveau |
| `retour` | Consignes données à Claude (corrections ou façons de faire validées) |
| `projet` | Contexte, objectifs, contraintes non déductibles du code ou de l'historique git (dates absolues) |
| `reference` | Liens externes (tableaux de bord, tickets, documentation) |

## Règles

- Ne pas dupliquer ce qui est déjà dans le code, `CLAUDE.md`, `docs/`, `documentation-dev/` ou l'historique git.
- Mettre à jour un fichier existant plutôt que d'en créer un doublon ; supprimer une mémoire devenue fausse.
- **Aucun secret** (mots de passe, clés, `.env.local`) : ce dossier est public sur GitHub.
- Claude ne commit pas : les nouvelles mémoires sont incluses dans le commit suivant fait par l'humain.
- En cas de conflit git sur `MEMORY.md`, garder les lignes des deux côtés.
