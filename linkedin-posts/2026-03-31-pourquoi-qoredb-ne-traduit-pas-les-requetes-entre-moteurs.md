# Post LinkedIn

Quand on construit un client de BDD multi-moteurs, la tentation c'est de proposer un SQL universel qui marche partout.

On a fait le choix inverse avec QoreDB.

Chaque requête est envoyée telle quelle au moteur cible. PostgreSQL reçoit du PostgreSQL. MongoDB reçoit du JSON natif. Pas de traduction, pas de réécriture.

L'unification se fait au niveau structurel, pas syntaxique : un trait Rust (DataEngine) définit l'interface commune, et chaque driver l'implémente avec les spécificités de son moteur.

Résultat : le debugging reste direct, l'autocomplétion est contextuelle, et une requête copiée depuis QoreDB fonctionne identiquement dans psql ou mongosh.

La seule exception, c'est la fédération inter-bases via DuckDB, et elle est explicite.

#QoreDB #OpenSource #Rust #PostgreSQL #SQL #DevTools #DatabaseClient

---

# Commentaire

L'article détaillé sur ce choix d'architecture est sur le blog :
https://www.qoredb.com/fr/blog/pourquoi-qoredb-ne-traduit-pas-les-requetes-entre-moteurs
