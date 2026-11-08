# 0001 — Stack technique

- **Statut** : accepté
- **Date** : 2026-11-07

## Contexte

Projet de formation CF2m, hébergé sur un VPS Hostinger (PHP 8.3, MariaDB 11.4).

## Décision

- Symfony 7.4 LTS, squelette `--webapp`.
- MariaDB 11.4 en développement (Docker) et en production.
- AssetMapper + importmap : aucun build Node, déploiement simple.
- Twig + Stimulus + Turbo pour l'interactivité.

## Conséquences

- Pas de `npm` : les dépendances JS s'ajoutent via `php bin/console importmap:require`.
- Bascule de PostgreSQL (valeur par défaut du squelette) vers MariaDB 11.4 **effectuée** (2026-11-07) : `compose.yaml`, `compose.override.yaml`, `DATABASE_URL` et `config/packages/doctrine.yaml` adaptés ; voir `docs/devops/docker-setup.md`.
- PHP 8.3 partout (Docker et Hostinger) : `composer.json` fixe `config.platform.php` à `8.3.0`. Le point bloquant 8.3/8.4 est résolu ; doctrine-bundle 2.x, doctrine-migrations-bundle 3.x, stimulus-bundle et ux-turbo 2.x, PHPUnit 12 sont retenus car leurs versions suivantes exigent PHP 8.4.
