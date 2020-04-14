# Shopixel webapp

## Structure

- `public/` : Fichier statiques
- `src/` : Sources du projet
  - `app/` : Component racine du projet
  - `components/` : Components communs au projet et réutilisables globalement
  - `domains/` : Chaque sous-dossier réprésente un domaine et contient tous les fichiers
associés à ce domaine
    - `*/components/` : Components relatifs à ce domaine
    - `*/services/` : Contient la logique relative à ce domaine
      - `store.js` : Contient le store relatif à ce domaine
      - `resources.js` : Contient les dépendances externes (appels HTTP, etc.)
      - `behaviors.js` : Contient les calculs et tout autre forme de logique externalisée d'un
component 
  - `lib/` : Autres ressources communes ou globales au projet 

## Communiquer avec l'API en local

Créer un fichier nommé `.env.local` en dupliquant le fichier `.env.local.template` présent
dans le répo. Ajouter les services avec les ports en local.
