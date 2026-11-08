---
name: retour-sous-agents
description: Comment travailler avec les sous-agents de ce projet (l'utilisateur leur parle directement, leurs rapports sont à vérifier)
type: retour
---

- L'utilisateur peut reprendre un sous-agent depuis sa vue transcript et lui donner des consignes directement (ex. « tout doit être dockerisé », « crée l'agent designer »). Un ajout qui semble « hors demande » peut donc venir de lui : **demander avant de supprimer**, ne jamais le présenter comme une initiative de l'agent sans vérifier.
- Les rapports des sous-agents se sont parfois révélés faux ou vides (rapport « placeholder », GRANT MariaDB prétendu sans effet, nom de branche erroné, menu bureau cassé non détecté) : **vérifier soi-même** l'état réel (git status, curl, captures) avant de rendre compte.
- Donner aux sous-agents un **périmètre strict** et un contrat explicite quand plusieurs travaillent en parallèle.
- Pour le visuel, l'utilisateur veut **voir des captures** : Chrome headless via `docker run --rm --network host -v /tmp/maquette-captures:/out zenika/alpine-chrome:124 --no-sandbox --hide-scrollbars --window-size=1440,1100 --virtual-time-budget=4000 --screenshot=/out/x.png <url>` (pas de navigateur installé dans WSL).
**Pourquoi :** erreurs constatées pendant les sessions des 2026-11-07 et 2026-11-08.
**Application :** à chaque délégation et à chaque compte rendu.
