---
name: projet-etat-2026-11-08
description: État du projet à la fin de la session du 2026-11-08 et prochaines étapes proposées
type: projet
---

État au 2026-11-08 (branche `feature/05-database`, rien n'est commité par Claude) :
- Fait : agents + mémoire partagée, MariaDB 11.4, dockerisation complète (php, worker, web Nginx :8080, database :3307, Mailpit :8025, phpMyAdmin :8081), PHP 8.3 partout, migration `messenger_messages`, maquette de design validée sur `/maquette` et `/maquette/clarinette` (dev uniquement).
- Aucune entité métier, aucun test PHPUnit.
- Prochaines étapes proposées (dans l'ordre) : 1) `architecte` valide le schéma Famille → Instrument → Modèle de `docs/architecture/database-schema.md`, puis `migrations` crée entités + migration ; 2) `testeur` écrit les premiers tests ; 3) worker Messenger en production Hostinger (cron/supervisor).
- À faire relire par l'utilisateur : faits de la frise chronologique et doigtés décoratifs de la maquette (écrits de mémoire par l'agent).
**Pourquoi :** reprendre là où on s'est arrêté sans relire tout l'historique.
**Application :** proposer l'étape 1 en début de prochaine session ; détails dans `documentation-dev/` (fiches du 2026-11-07 et 2026-11-08).
