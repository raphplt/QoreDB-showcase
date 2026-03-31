# Post LinkedIn

Dans QoreDB, le Data Grid est le composant central. C'est là qu'on passe 90 % du temps.

On a fait trois choix techniques qui changent l'expérience :

Virtualisation DOM avec TanStack Virtual, plus un pattern Proxy ES6 pour éviter l'explosion mémoire sur les gros résultats. 200 000 lignes, 50 nœuds DOM max.

Tri adaptatif : côté client en pagination classique, côté serveur (ORDER BY réel) en infinite scroll. La bascule est transparente.

Édition inline typée : cliquer sur une cellule, modifier, valider. Le parsing respecte le type déclaré par le moteur. Les mutations passent par l'intercepteur Rust qui applique les règles d'environnement.

En dev, c'est instantané. En prod, confirmation obligatoire. En sandbox, rien ne touche la base.

#QoreDB #OpenSource #DataGrid #React #Rust #TanStackTable

---

# Commentaire

Nouvel article sur le blog QoreDB : comment fonctionne le Data Grid sous le capot, de la virtualisation au tri server-side en passant par l'inline edit.

https://www.qoredb.com/fr/blog/data-grid-virtualisation-tri-server-side-inline-edit
