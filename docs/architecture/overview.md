# Vue d'ensemble de l'architecture

> Document à compléter par l'agent `architecte`.

## Objectif

Site de présentation de la famille des **bois** : historique de la famille en page d'accueil, puis une page par instrument et par modèle (texte, image, son).

## Hiérarchie du contenu

```
Famille (ex. Bois)
└── Instrument (ex. Clarinette)
    └── Modèle (ex. Clarinette en si♭, Clarinette basse)
```

## Pages prévues

| Page | Route (proposition) | Contenu |
|------|---------------------|---------|
| Accueil | `/` | Histoire de la famille |
| Famille | `/famille/{slug}` | Présentation + liste des instruments |
| Instrument | `/instrument/{slug}` | Texte, image, son, liste des modèles |
| Modèle | `/instrument/{slug}/modele/{slugModele}` | Texte, image, son |

Un menu permet de naviguer par famille puis par instrument.

## Stack

Symfony 7.4 LTS (`--webapp`), PHP 8.3, MariaDB 11.4, Doctrine ORM 3, Twig, AssetMapper + importmap, Stimulus, Turbo. Voir `decisions/0001-stack-technique.md`.

## Internationalisation

Français d'abord ; anglais et espagnol dans un second temps (à concevoir : préfixe de locale, contenus traduits en base).
