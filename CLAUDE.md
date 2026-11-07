## Projet instruments de musique

**Objectif** : Présentation d'une famille d'instruments de musique (je vais prendre spécifiquement la famille des bois). Histoire de cette famille d'instrument sur l'accueil, puis présentation de chaque instrument sur une page dédiée à chaque instrument. Chaque instrument aura sa propre page avec un texte de présentation, une image et un son. Plusieurs instruments peuvent avoir plusieurs modèles et donc des pages différentes.  Il y aura un menu pour naviguer entre les pages (par famille puis par instruments). 

**Public cible** : Passionnés de musique et de bois.

**Langue du projet** : Ce projet se fait entièrement en français : code (commentaires, messages de validation, noms de commits), documentation, et échanges. Par contre, il sera dans un second temps mis en anglais, Espagnol etc...

**Stack** : Symfony 7.4 LTS --webapp | PHP 8.3  MariaDB 11.4 | Docker en development | ImportMap.

**Environnements** : dev (Docker local) → production (GitHub CI) --> VPS  SSH (Hostinger) avec MariaDB 11.4 et PHP 8.3.

https://github.com/WebDevCF2m/instruments_de_musique

Le répertoire sera sous WSL (`/home/formaweb/instruments_de_musique` au travail, `/home/mikhawa/instruments_de_musique` à la maison);.

## Agents spécialisés

Toujours déléguer aux sous-agents de .claude/agents/ (règles de choix : .claude/models.md) :

Haiku : verificateur (tests + lint), redacteur-docs, admin-crud (EasyAdmin simple)
Sonnet : dev-api, dev-react, migrations, testeur, devops
Opus : architecte, auditeur-securite, debogueur

Toute modification de code se termine par un passage de verificateur.

## Commits et documentation
Claude ne peut pas faire de commits lui-même, ni créer de branche, mais il doit générer des messages de documentation à chaque action dans le dossier documentation-dev Toujours utiliser le format suivant :

Format : YYYY-MM-DD_HH-MM_Description-courte.md
Vérifier le dernier numéro existant avant de créer un nouveau fichier
Afficher les agents qui sont intervenus et leur niveau : <haiku|sonnet|opus>.
Contenu minimal : date, fichier(s) modifié(s), résumé des changements, raison

## Mémoire partagée

La mémoire de Claude est versionnée dans `.claude/memoire/` (partagée entre les postes via git) et **remplace la mémoire locale** `~/.claude/projects/.../memory/` : toujours lire et écrire les mémoires dans ce dossier. Format et règles : `.claude/memoire/README.md`. Aucun secret dedans (dépôt public).

Index chargé à chaque session :
@.claude/memoire/MEMORY.md

## Architecture notes

- **Frontend**: AssetMapper + importmap (`importmap.php`),pas de build node. point d'entrée `assets/app.js`; Stimulus controllers dans `assets/controllers/` (auto-enregistré via `assets/stimulus_bootstrap.js`), Turbo enabled. Templates dans `templates/` (Twig, extend `base.html.twig`).
- **Database**: Doctrine ORM 3 avec l'attribute mapping; `DATABASE_URL` dans `.env` sera en MariaDB 11.4 (ou MySQL 8.1) pour dev et prod; migrations via `doctrine:migrations`.

## Documentation de référence

À lire seulement quand la tâche le demande :

- Architecture : docs/architecture/overview.md
- Schéma BDD : docs/architecture/database-schema.md
- Décisions : docs/architecture/decisions/
- Docker : docs/devops/docker-setup.md
- GitHub Actions : docs/devops/github-actions.md
