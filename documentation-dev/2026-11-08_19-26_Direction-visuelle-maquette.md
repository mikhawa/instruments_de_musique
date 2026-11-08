# Direction visuelle « table de doigtés » et maquette

- **Date** : 2026-11-08 19:26
- **Branche** : feature/06-plugin-frontend-design

## Agents intervenus

| Agent | Niveau |
|-------|--------|
| Agent principal (orchestration, plan de design, captures) | opus |
| designer (front, 2 passages) | sonnet |
| dev-api | sonnet |
| dev-react | sonnet |
| verificateur | haiku |

## Fichier(s) modifié(s)

- `assets/styles/app.css` — modifié (jetons, polices, mise en page, composants)
- `assets/fonts/*` (4 woff2 Alegreya, 2 Instrument Sans, 2 licences OFL) — créés
- `templates/base.html.twig` — modifié
- `templates/maquette/_layout.html.twig`, `_menu.html.twig`, `_tablature.html.twig`, `_lecteur.html.twig`, `accueil.html.twig`, `instrument.html.twig` — créés
- `translations/messages.fr.yaml` — créé
- `config/packages/translation.yaml` — `default_locale` passé à `fr`
- `docs/architecture/decisions/0002-direction-visuelle.md` — créé

## Résumé des changements

- Palette, typographie auto-hébergée, rail de navigation, frise, page instrument, lecteur.
- Le motif des trous de doigté n'est utilisé que dans le menu, le lecteur et l'état actif.

## Raison

Direction visuelle validée par l'utilisateur ; voir l'ADR 0002.

## Message de commit proposé

```
feat: direction visuelle table de doigtés et maquette
```


## Compléments (agent principal)

- Direction « table de doigtés » proposée par l'agent principal et validée par l'utilisateur (palette grenadille / maillechort / buis / roseau / liège, Instrument Sans + Alegreya auto-hébergées) ; périmètre choisi : maquette statique.
- `src/Controller/MaquetteController.php` (dev-api) : routes `maquette_accueil` (/maquette) et `maquette_instrument` (/maquette/clarinette), `env: 'dev'` uniquement (0 route en prod).
- `assets/controllers/lecteur_controller.js` + `assets/audio/exemple-clarinette.wav` (dev-react) : lecteur qui bouche les trous au fil de la lecture ; son factice (sol3, harmoniques impaires, 3 s).
- Correctif `designer` : le rail restait replié sur bureau (`::details-content` non pris en charge par Chrome < 131 / Firefox) → contrôleur Stimulus `assets/controllers/rail_controller.js` (matchMedia 48rem).
- `.claude/agents/verificateur.md` : commandes passées dans le conteneur Docker, ajout de `lint:translations --locale=fr`.
- Captures réelles (Chrome headless dans Docker) : bureau et mobile, accueil et clarinette.
- Vérification (verificateur) : php -l, lint:container, lint:yaml, lint:twig, lint:translations --locale=fr, schema:validate, importmap:audit OK ; /maquette et /maquette/clarinette → 200 ; WAV, CSS, woff2 et JS servis avec empreinte (200, bons Content-Type) ; PHPUnit : aucun test.

## Points ouverts

- Faits de la frise et doigtés décoratifs à relire par l'utilisateur.
- `default_locale` passé de `en` à `fr` (config/packages/translation.yaml) : à confirmer.
- Retouches possibles : glyphe ♭ hors police, vide sur grand écran, cadre du lecteur.
- Photos et enregistrements réels à fournir.

## Message de commit proposé (final)

```
feat: maquette « table de doigtés » (layout, menu, lecteur audio, polices auto-hébergées)
```

## Retouches (demandées par l'utilisateur après revue des captures)

- Décision de l'utilisateur : `default_locale` reste en `fr`.
- `designer` (sonnet) :
  - glyphe ♭ : police de secours auto-hébergée Noto Music 5.3.0 (`assets/fonts/noto-music-music-400-normal.woff2`, 56 Ko, licence `OFL-NotoMusic.txt`), déclarée sous `Alteration` avec `unicode-range: U+266D-266F` et `size-adjust: 175%` ;
  - largeur maximale `--largeur-max: 62rem`, grille texte 65ch + colonne latérale 15–18rem alignée à gauche ;
  - lecteur sans cadre : tronçon de tube vertical à 7 trous + bouton texte avec pastille lecture/pause (buis en lecture) ;
  - `assets/styles/app.css` et ADR `docs/architecture/decisions/0002-direction-visuelle.md` mis à jour.
- Captures : `retouche-clarinette-1440/1920/390.png`, `retouche-accueil-1440.png`.
- `verificateur` (haiku) : lint:container, lint:yaml, lint:twig, lint:translations --locale=fr, schema:validate OK ; police Noto Music servie (200, font/woff2) ; pages 200 ; PHPUnit : aucun test.
- Reste : la hampe du ♭ croise le soulignement des liens ; l'état « en lecture » du lecteur n'a pas été capturé.
