# QoreDB — Script Démo (1min30–2min)

> Objectif : montrer que QoreDB est un client de bases de données **moderne, rapide et agréable** — l'anti-DBeaver.
> Ton : confiant, calme, développeur qui parle à des développeurs. Pas de bullshit marketing.
> Base de démo : **tcg_nexus** (PostgreSQL) — marketplace de cartes Pokémon avec tournois, ~30 tables, FK partout, du jsonb.

---

## PLAN DE LA DÉMO

| Timing     | Séquence                        | Durée |
| ---------- | ------------------------------- | ----- |
| 0:00–0:08  | Intro — plan large sur l'app    | ~8s   |
| 0:08–0:25  | Connexion + exploration sidebar | ~17s  |
| 0:25–0:45  | Éditeur SQL + exécution         | ~20s  |
| 0:45–1:00  | Data grid + inline edit         | ~15s  |
| 1:00–1:15  | ER Diagram                      | ~15s  |
| 1:15–1:30  | Power features (diff)           | ~15s  |
| 1:30–1:45  | Sécurité + environnements       | ~15s  |
| 1:45–1:55  | Closing                         | ~10s  |

---

## SÉQUENCE 1 — Intro (0:00–0:08)

### Écran

- L'app est déjà ouverte sur le Dashboard/Home (dark mode).
- Plan large sur l'interface complète, sidebar fermée.

### Montage

- **Cut sec** direct sur l'app. Pas de slide titre, l'app parle d'elle-même.
- Léger **zoom in** progressif (105%) sur 3 secondes.

### Audio

> « Les clients de bases de données, c'est souvent le même problème : lents, moches, et pénibles à utiliser au quotidien. QoreDB, c'est l'inverse. »

---

## SÉQUENCE 2 — Connexion + Exploration (0:08–0:25)

### Écran — Actions exactes

1. **Clic** sur "New Connection" (ou `+` dans la sidebar).
2. Le formulaire s'ouvre — sélectionner **PostgreSQL** dans le dropdown de drivers.
   - **Scroller lentement** le dropdown pour montrer les autres drivers (MySQL, MongoDB, Redis, SQLite, SQL Server, CockroachDB, DuckDB…).
3. Remplir les champs avec la connexion **tcg_nexus** (idéalement pré-configurée, juste valider).
4. **Clic** sur "Test Connection" → feedback vert ✓.
5. **Clic** sur "Save & Connect".
6. La sidebar se déplie : `tcg_nexus` → `public` → tables.
7. **Déplier** l'arbre rapidement : montrer la liste des ~30 tables (`card`, `user`, `tournament`, `listing`, `deck`, `collection`…).
8. **Clic** sur `card` dans l'arbre pour montrer les métadonnées (colonnes, types, FK vers `pokemon_set`).

### Montage

- **Zoom** sur le dropdown des drivers quand tu scrolles les logos.
- **Cut** au moment de la connexion si le chargement prend >1s.
- **Zoom** sur la sidebar dépliée — montrer la densité de tables.
- **Zoom** rapide sur les métadonnées de `card` (colonnes jsonb `variants`, `pricing`).

### Audio

> « Tu te connectes en quelques secondes. PostgreSQL, MySQL, MongoDB, Redis, SQLite, SQL Server, CockroachDB, DuckDB — tout dans un seul outil. L'arbre de navigation est immédiat : 30 tables, les colonnes, les types, les relations — tout est là en un coup d'œil. »

---

## SÉQUENCE 3 — Éditeur SQL + Exécution (0:25–0:45)

### Écran — Actions exactes

1. **Double-clic** sur la table `card` dans la sidebar → un onglet query s'ouvre avec un `SELECT * FROM card` pré-rempli.
2. **Effacer** la requête et **taper** celle-ci manuellement :
   ```sql
   SELECT c.name, c.rarity, s.name AS set_name,
          COUNT(l.id) AS active_listings,
          ROUND(AVG(l.price), 2) AS avg_price
   FROM card c
   JOIN pokemon_set s ON s.id = c."setId"
   LEFT JOIN listing l ON l.card_id = c.id
   GROUP BY c.id, c.name, c.rarity, s.name
   HAVING COUNT(l.id) > 0
   ORDER BY avg_price DESC
   LIMIT 25;
   ```
3. Pendant la frappe, montrer l'**autocomplétion** qui propose les noms de tables et colonnes (quand tu tapes `c.` → les colonnes de `card` apparaissent, quand tu tapes `FROM ` → les tables).
4. **Cmd+Enter** pour exécuter.
5. Les résultats s'affichent dans le grid : noms de cartes, raretés, sets, prix moyens.

### Montage

- **Zoom** sur l'éditeur pendant la frappe — montrer le syntax highlighting (mots-clés en violet, strings en vert, etc.).
- **Zoom** rapide quand l'autocomplétion pop avec les colonnes de `card`.
- **Cut net** entre le Cmd+Enter et l'affichage des résultats — garder le rythme.

### Audio

> « L'éditeur SQL avec coloration, autocomplétion sur ton schéma, et formattage automatique. Tu exécutes, et les résultats tombent. Pas de loading spinner, pas d'attente. »

---

## SÉQUENCE 4 — Data Grid + Inline Edit (0:45–1:00)

### Écran — Actions exactes

1. Ouvrir un nouvel onglet et lancer `SELECT * FROM listing ORDER BY "createdAt" DESC;` (ou double-clic sur `listing` dans la sidebar).
2. Le grid affiche les listings : prix, quantité, état de la carte, dates.
3. **Scroll rapide** vers le bas — montrer la fluidité (virtualisation, pas de lag).
4. **Clic** sur le header `price` pour trier par prix décroissant.
5. **Clic** sur l'icône filtre de la colonne `currency` → filtrer sur `EUR`.
6. **Double-clic** sur une cellule `quantityAvailable` → changer la valeur (ex: `3` → `5`) → **Entrée**.
7. La cellule change de couleur (indicateur de modification).
8. **Clic** sur "Apply" pour commiter.

### Montage

- **Zoom** sur le grid pendant le scroll rapide — montrer la densité des données.
- **Zoom** sur la cellule éditée — passage en mode édition bien visible.
- **Cut** après le save.

### Audio

> « Le grid est virtualisé — des milliers de lignes sans aucun lag. Tu filtres, tu tries, et tu édites directement dans les cellules. Les modifications sont trackées et appliquées proprement. »

---

## SÉQUENCE 5 — ER Diagram (1:00–1:15)

### Écran — Actions exactes

1. **Clic droit** sur le schéma `public` dans la sidebar → "View ER Diagram".
2. Le diagramme s'affiche : les ~30 tables de tcg_nexus avec toutes leurs relations.
3. **Zoom out** d'abord pour montrer la vue d'ensemble — impressionnant avec 30 tables.
4. **Drag** pour naviguer vers le cluster **marketplace** : `listing` → `card` → `pokemon_set` → `pokemon_serie`.
5. **Zoom in** sur ce cluster — les lignes de FK sont clairement visibles.
6. **Drag** vers le cluster **tournament** : `tournament` → `match` → `player` → `ranking` → `statistics`.
7. **Clic** sur la table `tournament` — montrer ses colonnes dans le panneau.

### Montage

- Plan **large** au moment où le diagramme complet apparaît — le nombre de tables + relations doit impressionner.
- **Zoom progressif** sur le cluster marketplace (card/listing/set/serie).
- **Pan** fluide vers le cluster tournament.
- Garder 2-3 secondes sur chaque cluster pour que ce soit lisible.

### Audio

> « Le diagramme ER est généré automatiquement depuis ton schéma. 30 tables, toutes les relations — tu navigues, tu zoomes, et tu comprends ta base en 5 secondes. »

---

## SÉQUENCE 6 — Power Features (1:15–1:30)

### Écran — Actions exactes (Data Diff)

1. Ouvrir la feature **Data Diff** (Cmd+K → taper "Diff" ou via le menu).
2. **Source A** : lancer `SELECT name, rarity, pricing FROM card WHERE "setId" = 'sv05' LIMIT 20;` (un set Pokémon).
3. **Source B** : la même requête mais sur un snapshot ou une autre connexion (staging vs prod, ou un set différent).
4. Les résultats s'affichent côte à côte : lignes ajoutées en vert, supprimées en rouge, modifiées en jaune.
5. Montrer 2-3 différences clairement visibles.

### Montage

- **Zoom** sur la vue diff côte à côte — les couleurs doivent être bien visibles.
- Transition rapide — cette séquence doit être punchy, pas plus de 12-15 secondes.

### Audio

> « Tu peux comparer deux jeux de données côte à côte — parfait pour vérifier un déploiement entre staging et prod. Les ajouts, suppressions et modifications ressortent en un clin d'œil. »

---

## SÉQUENCE 7 — Sécurité + Environnements (1:30–1:45)

### Écran — Actions exactes

1. Montrer la **barre de statut** en bas — badge d'environnement **DEV** (bleu/vert).
2. **Changer de connexion** vers la connexion "tcg_nexus (PROD)" → la barre passe en **rouge**.
3. Dans l'éditeur, taper :
   ```sql
   DROP TABLE "user";
   ```
4. **Cmd+Enter** → QoreDB **bloque** l'exécution avec un message d'avertissement rouge.
5. *(Optionnel, si le temps le permet)* Montrer brièvement le **vault** : l'écran de lock / les credentials masqués.

### Montage

- **Zoom** sur la barre de statut quand elle passe en rouge "PRODUCTION".
- **Zoom** sur le warning de blocage du DROP — le message doit être lisible 2 secondes.
- Flash rapide — c'est une démonstration de confiance, pas un tutoriel.

### Audio

> « Chaque connexion est classée par environnement : dev, staging, production. En prod, QoreDB bloque automatiquement les requêtes dangereuses. Plus de DROP TABLE accidentel à 3h du matin. Et tes credentials sont chiffrés dans un vault local. »

---

## SÉQUENCE 8 — Closing (1:45–1:55)

### Écran

- Revenir sur le **Dashboard** ou une vue d'ensemble de l'app avec la sidebar dépliée.
- *(Optionnel)* Afficher le site web QoreDB ou la page GitHub.

### Montage

- **Zoom out** progressif depuis l'app.
- Fin sur le logo QoreDB ou l'URL du site.
- Fade to black.

### Audio

> « QoreDB. Open-source, rapide, et conçu pour les développeurs. Disponible sur Mac, Windows et Linux. Essayez-le. »

---

## NOTES DE PRÉPARATION

### Avant l'enregistrement

- **Base tcg_nexus** : s'assurer que la base est up et remplie avec suffisamment de données (cartes, listings, users, tournois). Idéalement 1000+ cartes, 500+ listings, quelques tournois avec matchs.
- **2 connexions configurées** :
  - `tcg_nexus (DEV)` — environnement dev, badge bleu
  - `tcg_nexus (PROD)` — environnement prod, badge rouge, mode read-only
- **Dark mode activé** — rend mieux en vidéo.
- **Résolution** : 1920×1080 ou 2560×1440 — vérifier qu'OpenScreen capture en haute résolution.
- **Taille de police éditeur** : 14-16px minimum pour être lisible en vidéo.
- **Fermer tout le reste** : notifications off, pas d'onglets parasites, bureau propre.
- **Pré-taper les requêtes** dans un fichier texte à côté pour pouvoir copier-coller si la frappe à la volée prend trop de temps. Mais l'idéal est de taper en live pour montrer l'autocomplétion.

### Tips OpenScreen / Montage

- Enregistre chaque séquence **séparément** pour plus de contrôle au montage.
- Les **zooms** se font en post-prod — enregistre en résolution max et crop ensuite.
- Rythme **rapide mais lisible** : chaque action visible 1-2 secondes avant le cut.
- Musique de fond : lo-fi ou synthwave léger (Epidemic Sound, Artlist). Pas trop forte — la voix domine.
- Durée cible de la voix : ~1min30. Le reste c'est du breathing room avec la musique.

---

## SCRIPT AUDIO COMPLET

À lire d'un trait, en calant sur les séquences :

> « Les clients de bases de données, c'est souvent le même problème : lents, moches, et pénibles à utiliser au quotidien. QoreDB, c'est l'inverse.
>
> Tu te connectes en quelques secondes. PostgreSQL, MySQL, MongoDB, Redis, SQLite, SQL Server, CockroachDB, DuckDB — tout dans un seul outil. L'arbre de navigation est immédiat : 30 tables, les colonnes, les types, les relations — tout est là en un coup d'œil.
>
> L'éditeur SQL avec coloration, autocomplétion sur ton schéma, et formattage automatique. Tu exécutes, et les résultats tombent. Pas de loading spinner, pas d'attente.
>
> Le grid est virtualisé — des milliers de lignes sans aucun lag. Tu filtres, tu tries, et tu édites directement dans les cellules. Les modifications sont trackées et appliquées proprement.
>
> Le diagramme ER est généré automatiquement depuis ton schéma. 30 tables, toutes les relations — tu navigues, tu zoomes, et tu comprends ta base en 5 secondes.
>
> Tu peux comparer deux jeux de données côte à côte — parfait pour vérifier un déploiement entre staging et prod. Les ajouts, suppressions et modifications ressortent en un clin d'œil.
>
> Chaque connexion est classée par environnement : dev, staging, production. En prod, QoreDB bloque automatiquement les requêtes dangereuses. Plus de DROP TABLE accidentel à 3h du matin. Et tes credentials sont chiffrés dans un vault local.
>
> QoreDB. Open-source, rapide, et conçu pour les développeurs. Disponible sur Mac, Windows et Linux. Essayez-le. »
