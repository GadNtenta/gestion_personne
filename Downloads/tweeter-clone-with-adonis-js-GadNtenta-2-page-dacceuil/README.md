[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/I_MEMlAn)

# Twitter Clone avec AdonisJS

Un clone de Twitter construit avec AdonisJS, un framework Node.js moderne.

## Fonctionnalités

- Authentification des utilisateurs
- Création et gestion des tweets
- Interface utilisateur moderne avec Tailwind CSS
- Support des médias dans les tweets
- Système de likes et retweets

## Prérequis

- Node.js 18.x ou supérieur
- PostgreSQL
- npm ou yarn

## Installation

1. Cloner le repository :

```bash
git clone [URL_DU_REPO]
cd tweeter-clone-with-adonis-js-GadNtenta
```

2. Installer les dépendances :

```bash
npm install
```

3. Copier le fichier .env.example en .env :

```bash
cp .env.example .env
```

4. Configurer les variables d'environnement dans le fichier .env

5. Exécuter les migrations de la base de données :

```bash
node ace migration:run
```

6. Lancer le serveur de développement :

```bash
npm run dev
```

## Déploiement

Le projet est configuré pour être déployé sur Render. Assurez-vous d'avoir configuré les variables d'environnement suivantes sur Render :

- NODE_ENV=production
- PORT=10000
- HOST=0.0.0.0
- APP_KEY (généré automatiquement)
- Variables de base de données PostgreSQL

## Technologies utilisées

- AdonisJS
- PostgreSQL
- Tailwind CSS
- TypeScript
- Vite

## Licence

Ce projet est sous licence MIT.
