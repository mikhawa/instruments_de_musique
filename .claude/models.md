# Règles de choix des sous-agents

Toute tâche est déléguée à un sous-agent de `.claude/agents/`. Choisir le **modèle le moins cher capable de faire le travail correctement**.

| Niveau | Quand l'utiliser | Agents |
|--------|------------------|--------|
| **haiku** | Tâches mécaniques, bien cadrées, peu de raisonnement : lancer des commandes, rédiger, CRUD standard | `verificateur`, `redacteur-docs`, `admin-crud` |
| **sonnet** | Développement courant : écrire/modifier du code, tests, migrations, Docker/CI | `dev-api`, `dev-react`, `migrations`, `testeur`, `devops` |
| **opus** | Raisonnement profond, décisions difficiles à défaire, analyse transversale | `architecte`, `auditeur-securite`, `debogueur` |

## Arbre de décision

1. La tâche touche la conception (modèle de données, découpage, choix de bundle) ? → `architecte`
2. Un bug dont la cause n'est pas évidente ? → `debogueur`
3. Authentification, formulaires, uploads, droits, mise en production ? → `auditeur-securite` (en relecture)
4. Entités / schéma BDD ? → `migrations`
5. Contrôleurs, services, repositories, formulaires, logique PHP ? → `dev-api`
6. Templates Twig, Stimulus, Turbo, CSS, JS via importmap ? → `dev-react`
7. Back-office EasyAdmin standard (CrudController simple) ? → `admin-crud`
8. Écrire ou compléter des tests PHPUnit ? → `testeur`
9. Docker, GitHub Actions, déploiement Hostinger ? → `devops`
10. Documentation (README, docs/, documentation-dev/) ? → `redacteur-docs`

## Règles transverses

- **Toute modification de code se termine par `verificateur`.** S'il échoue, renvoyer à l'agent d'origine (ou `debogueur` après deux échecs).
- Monter d'un niveau (haiku → sonnet → opus) si un agent échoue deux fois sur la même tâche.
- Après chaque action, `redacteur-docs` crée la fiche dans `documentation-dev/` en listant les agents et leur niveau.
- Aucun agent ne fait de commit, ne crée de branche ni ne pousse : c'est l'humain qui s'en charge.
- Tout se fait en français (code commenté, messages de validation, docs).
