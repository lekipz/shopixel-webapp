# Shopixel webapp

Ce dépôt contient la partie front du projet Shopixel, c'est à dire l'interface Web du simulateur.
Il s'agit d'un projet [React](https://fr.reactjs.org/) permattant de visualiser une simulation
d'un magasin, avec des flux de clients arrivant et sortant du magasin, et permattant de voir les
réapprovisionnement de stocks et les recommendations personnalisées en temps réel.

## Sommaire

- [Installation](#installation)
  - [Prérequis](#prérequis)
  - [Installation des dépendances](#installation-des-dépendances)
- [Développement](#développement)
  - [Configuration](#configuration)
  - [Démarrage du projet](#démarrage-du-projet)
- [Build](#build)
- [Déploiement](#déploiement)
- [Liens](#liens)

## Installation

### Prérequis

- [Node.js >= 12.x.x](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

### Installation des dépendances

Depuis la racine du projet, lancer la commande suivante :

```shell script
yarn
```

## Développement

### Configuration

Il faut d'abord renseigner une variable d'environnement pour configurer le projet. Dupliquer le fichier
`.env.local.template` en un nouveau fichier `.env.local`. Ce fichier ne doit **jamais** être ajouté 
dans le gestionnaire de contrôle de version : une ligne lui est donc dédiée dans le fichier `.gitignore`.

Renseignez le chemin de base vers l'API Shopixel dans la variable `REACT_APP_API_ENDPOINT`. Si vous
avez lancé l'API en local, renseignez la valeur `http://localhost:8080` (Attention : ne pas mettre de "**/**"
à la fin). 
Si vous souhaitez utilisez l'API de production en local, renseignez la valeur contenue dans le fichier
`.env.production`.

### Démarrage du projet

Pour lancer le projet, depuis la racine du projet, lancer la commande suivante :

```shell script
yarn start
```

Cette commande lance un serveur en local qui va servir l'application front, et se mettra automatiquement
à jour lors d'une quelconque modification sur un ou plusieurs fichiers du projet. L'interface est accessible
depuis l'URL `http://localhost:3000`.

## Build

Pour construire le projet en mode production, lancer la commande suivante dans un terminal à la
racine du projet :

```shell script
yarn build
```

Le code est ainsi minifié et optimisé dans le dossier `build`.

## Déploiement

Le projet est hébergé sur un dépôt privée GitHub, qui est directement lié à un job [Travis CI](https://travis-ci.com/).
A chaque fois qu'un changement est observé sur la branche `master`, Travis CI effectue automatiquement
un nouveau déploiement. L'applcation est packagée est déployée sur un bucket AWS S3, configuré pour
servir l'application en tant que site web statique.

## Liens

- Application URL : http://shopixel-webapp.s3-website-eu-west-1.amazonaws.com/
- Github : https://github.com/lekipz/shopixel-webapp
- Travis CI : https://travis-ci.com/github/lekipz/shopixel-webapp
