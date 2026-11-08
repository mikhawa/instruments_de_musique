---
name: decisions-utilisateur
description: Décisions prises par l'utilisateur qu'il ne faut pas remettre en question ni « corriger »
type: retour
---

- **PHP 8.3 partout** (dev Docker et prod), imposé par `config.platform.php = 8.3.0` dans composer.json : ne pas monter doctrine-bundle 3, stimulus-bundle/ux-turbo 3, PHPUnit 13 (ils exigent PHP 8.4).
- **Langue par défaut `fr`** (`config/packages/translation.yaml`) : à garder.
- **Direction visuelle « table de doigtés »** validée (voir ADR `docs/architecture/decisions/0002-direction-visuelle.md`).
- **Le ♭ (hampe qui croise le soulignement des liens) est laissé tel quel** : l'utilisateur a refusé la retouche le 2026-11-08.
- Toute la stack tourne dans Docker : commandes via `docker compose exec php ...` (pas encore écrit dans CLAUDE.md, question restée sans réponse).
**Pourquoi :** éviter de reproposer ou d'annuler des choix déjà tranchés.
**Application :** respecter ces choix ; ne les rouvrir que si l'utilisateur le demande.
