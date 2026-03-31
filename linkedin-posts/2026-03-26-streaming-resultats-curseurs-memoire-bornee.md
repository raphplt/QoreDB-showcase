# Post LinkedIn

Quand un SELECT retourne 5 millions de lignes, la plupart des clients de BDD chargent tout en mémoire avant d'afficher quoi que ce soit.

Dans QoreDB, chaque ligne est transmise au frontend dès qu'elle sort du curseur. Le pipeline repose sur un canal tokio borné à 100 éléments avec backpressure natif : si le consommateur ralentit, le driver ralentit aussi.

Concrètement, ça veut dire :
- Mémoire constante quel que soit le nombre de lignes
- Premiers résultats affichés quasi instantanément
- Export de millions de lignes sans pic de RAM
- Annulation propre à tout moment (pg_cancel_backend, KILL QUERY...)

Le même mécanisme sert pour l'affichage interactif et pour le pipeline d'export (CSV, JSON, Parquet). Tout passe par le même canal borné, les mêmes événements typés, le même backpressure.

C'est un choix d'architecture, pas une optimisation ajoutée après coup.

#QoreDB #OpenSource #Rust #Streaming #DatabaseTooling #Tokio

---

# Commentaire

Tout le détail technique dans l'article : curseurs natifs par driver, batch flushing, throttling IPC, virtualisation DOM.
https://www.qoredb.com/fr/blog/streaming-resultats-curseurs-memoire-bornee
