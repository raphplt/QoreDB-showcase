# Post LinkedIn

Dans un client de base de données, l'éditeur SQL c'est le coeur de l'expérience.

Pour QoreDB, j'ai choisi CodeMirror 6 plutôt que Monaco. Pas par effet de mode, mais parce que son architecture modulaire colle parfaitement avec Tauri 2 : on importe uniquement ce qu'on utilise, le bundle reste léger, et l'état immutable s'intègre bien avec React.

L'autocomplétion repose sur trois sources : les mots-clés du dialecte actif (PostgreSQL, MySQL ou SQL Server), des snippets avec placeholders, et surtout les métadonnées réelles du schéma. On interroge le backend Rust, on cache les résultats cinq minutes, et on invalide automatiquement après un DDL.

Résultat : quand vous tapez users. vous obtenez les vraies colonnes de votre table. Pas de devinette, pas de magie.

#QoreDB #OpenSource #CodeMirror #SQL #Rust #Tauri #DevTools

---

# Commentaire

L'article complet avec le détail du cache de schéma, du rôle du backend Rust dans l'introspection, et des choix volontaires sur le linting :
https://www.qoredb.com/fr/blog/editeur-sql-codemirror-autocompletion-choix-volontaires
