# 0002 — Direction visuelle : « la table de doigtés »

- **Statut** : accepté
- **Date** : 2026-11-08

## Contexte

Le site présente la famille des bois (flûte, hautbois, clarinette, basson, saxophone) à un public de passionnés. Il faut une identité visuelle sobre, lisible, accessible (WCAG 2.1 AA) et sans dépendance externe.

## Décision

### Motif signature : la table de doigtés

La tablature de doigtés (trous bouchés = disque plein, trous ouverts = cercle vide) est le seul motif décoratif. Il apparaît **à trois endroits uniquement** :

1. **Menu** : chaque instrument porte une mini-tablature horizontale de 5 à 7 cercles (`.tablature`), décorative, `aria-hidden="true"`. Les doigtés sont simplifiés et à faire valider.
2. **Lecteur audio** : sans cadre. Un tronçon de corps d'instrument vertical (`.lecteur__trous` : deux bords grenadille de 3 px, 7 trous `.lecteur__trou` sur l'axe qui se bouchent au fil de la lecture, classe `est-bouche`) à côté d'un bouton texte (`.lecteur__bouton`, cible ≥ 44 px) précédé d'une pastille grenadille avec triangle « lecture » tracé en CSS (`clip-path`). En lecture (`est-en-lecture`, posée par le contrôleur Stimulus `lecteur`), la pastille passe au buis avec une icône pause (deux barres). Le texte du bouton est géré par le JS. Transitions de 0,25 s, supprimées sous `prefers-reduced-motion: reduce`.
3. **État actif et focus** : le lien de la page courante (`aria-current="page"`) et le lien focalisé au clavier reçoivent une pastille buis (un trou bouché). Le focus visible reste en plus signalé par un contour grenadille de 3 px.

### Palette (variables CSS sur `:root`)

| Variable | Valeur | Usage | Contraste sur fond maillechort |
|----------|--------|-------|-------------------------------|
| `--grenadille` | `#2B1E26` | texte, traits | 12,93:1 |
| `--maillechort` | `#E6E8E3` | fond | (référence) |
| `--roseau` | `#5F5D36` | texte secondaire | 5,48:1 (AA) |
| `--roseau-filet` | `#8C8A5A` | filets, ornements (roseau d'origine) | 2,89:1 (jamais pour du texte) |
| `--buis` | `#D4AE45` | accent graphique : trou bouché, état actif | 1,71:1 (jamais pour du texte) |
| `--liege` | `#B9A99A` | bordures discrètes | 1,85:1 |

Le roseau initial (`#8C8A5A`) n'atteignait que 2,89:1 : il a été assombri en `#5F5D36` pour le texte. Le texte grenadille sur buis atteint 7,55:1. Pas de mode sombre pour l'instant.

### Typographie

- Titres : **Instrument Sans** (axes `wght` 400-700 et `wdth` 75-100 %), utilisée en condensé (`font-stretch` 75-85 %), graisses 500-700 : les instruments sont longs et étroits, les titres aussi.
- Textes : **Alegreya** (serif, axe `wght`), interligne 1,6, mesure maximale 65 ch.
- Échelle de ratio 1,25 à partir de 1,125 rem (`--t-moins-1` à `--t-5`).
- Polices **auto-hébergées** dans `assets/fonts/` (woff2 variables latin et latin-ext, paquets `@fontsource-variable` 5.3.0, licence SIL OFL 1.1 : `OFL-*.txt`), `font-display: swap`. Aucun appel à Google Fonts : respect du RGPD (pas de transfert d'adresse IP à un tiers).
- Signe ♭ (♮ ♯) : absent des sous-ensembles latin et latin-ext d'Alegreya et d'Instrument Sans (vérifié sur leurs `unicode-range`). Police de secours **Noto Music 5.3.0** (`@fontsource/noto-music`, jsDelivr, SIL OFL 1.1, `OFL-NotoMusic.txt`, woff2 sous-ensemble « music », graisse unique 400), déclarée sous le nom `Alteration` avec `unicode-range: U+266D-266F` et `size-adjust: 175%` pour égaler la hauteur des lettres ; ajoutée aux piles `--police-titre` et `--police-texte`. Elle n'est téléchargée que si la page contient le signe. Le caractère ♭ reste dans le texte.

### À éviter

Libellés en majuscules espacées au-dessus des titres ; un seul mot accentué en couleur ou en italique dans un titre ; cartes arrondies identiques avec ombre grise ; dégradés décoratifs ; flèches « → » dans les liens ; numérotation 01/02/03 (sauf frise chronologique, vraie séquence) ; séparateurs « A · B · C ».

### Mise en page

Rail de navigation à gauche sur bureau (`<nav aria-label="Instruments">`) ; sur mobile (≤ 48 rem), menu repliable `<details>`/`<summary>` sans JavaScript, cibles tactiles ≥ 44 px. Page d'instrument : visuel pleine largeur, texte (65 ch) et colonne latérale collante (lecteur, modèles) de 18 rem max. à partir de 64 rem, alignées à gauche avec un écart de 4 rem : la colonne suit le texte au lieu de partir au bord. Largeur maximale de la zone principale `--largeur-max: 62rem` (padding compris), commune à l'accueil (frise) et aux pages d'instrument ; au-delà, l'espace libre reste à droite. Mobile d'abord.

## Conséquences

- Tout le style tient dans `assets/styles/app.css` (CSS pur, BEM en français, faible spécificité).
- Le rail déployé sur bureau s'appuie sur `::details-content` ; les navigateurs plus anciens gardent le menu repliable (dégradation acceptable).
- Photos des instruments à fournir ; le schéma SVG de la clarinette est provisoire.
