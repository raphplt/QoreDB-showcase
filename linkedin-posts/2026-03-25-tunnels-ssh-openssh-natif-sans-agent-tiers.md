# Post LinkedIn

La plupart des clients de base de données embarquent une bibliothèque SSH (libssh2, paramiko, russh) pour gérer les tunnels vers vos serveurs.

Dans QoreDB, on a fait un choix différent : déléguer au client OpenSSH natif de la machine.

Concrètement, QoreDB lance un processus ssh -N -L en arrière-plan, avec allocation automatique du port local, keep-alive intégré, et reconnexion transparente si le tunnel tombe.

On utilise un fichier known_hosts dédié, séparé de celui du système. Le stderr SSH est filtré et anonymisé avant d'être affiché. Le ProxyJump est validé par regex côté Rust pour bloquer toute injection.

Le résultat : zéro bibliothèque SSH à maintenir, compatibilité totale avec ssh-agent et ~/.ssh/config, et un module Rust de quelques centaines de lignes avec un trait extensible.

Nouvel article sur le blog technique de QoreDB.

#QoreDB #OpenSource #SSH #Rust #Tauri #DevTools #Database

---

# Commentaire

L'article détaille l'architecture complète du tunnel SSH dans QoreDB, avec des extraits du code Rust et les choix de sécurité associés.

https://www.qoredb.com/fr/blog/tunnels-ssh-openssh-natif-sans-agent-tiers
