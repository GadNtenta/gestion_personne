# Gestion des Personnes

Application Next.js 14 avec CRUD complet pour gérer des personnes.

## 🚀 Fonctionnalités

- ✅ **CRUD Complet** : Ajouter, Modifier, Supprimer, Voir
- ✅ **Recherche en temps réel** : Filtrer par nom, postnom ou prénom
- ✅ **Filtre par sexe** : Masculin, Féminin ou Tous
- ✅ **Statistiques dynamiques** : Total, répartition par sexe avec pourcentages
- ✅ **Import/Export JSON** : Sauvegarde et importation de données
- ✅ **Validation intelligente** : Vérification du schéma à l'import
- ✅ **Prévisualisation** : Aperçu des données avant importation
- ✅ **Design moderne** : Interface premium avec Tailwind CSS
- ✅ **Base de données SQLite** : Persistance avec Prisma ORM

## 📋 Champs du formulaire

- Nom
- Postnom
- Prénom
- Sexe (Masculin/Féminin)

## 🛠️ Technologies utilisées

- **Framework**: Next.js 14 (App Router)
- **Base de données**: SQLite
- **ORM**: Prisma
- **Style**: Tailwind CSS
- **TypeScript**: Pour la sécurité du typage

## 📦 Installation

1. Installez les dépendances :

```bash
npm install
```

2. Initialisez la base de données :

```bash
npx prisma migrate dev --name init
```

3. Lancez le serveur de développement :

```bash
npm run dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📚 Structure du projet (Architecture Modulaire)

```
/
├── app/
│   ├── api/persons/               # API Routes
│   │   ├── route.ts               # GET (liste) & POST (créer)
│   │   ├── [id]/route.ts          # PUT (modifier) & DELETE (supprimer)
│   │   ├── export/route.ts        # GET (exporter en JSON)
│   │   └── import/route.ts        # POST (importer & valider)
│   ├── globals.css                # Styles globaux + animations
│   ├── layout.tsx                 # Layout principal
│   └── page.tsx                   # Page principale (orchestration)
│
├── components/                    # 🎯 Composants réutilisables
│   ├── StatisticsCards.tsx        # Cartes de statistiques
│   ├── ImportExportButtons.tsx    # Boutons Import/Export
│   ├── PersonForm.tsx             # Formulaire ajout/modification
│   ├── SearchFilters.tsx          # Barre de recherche + filtre
│   ├── PersonTable.tsx            # Tableau des personnes
│   ├── ImportModal.tsx            # Modale de prévisualisation
│   └── Footer.tsx                 # Footer avec crédit
│
├── types/                         # 📝 Types TypeScript partagés
│   └── person.ts                  # Interfaces (Person, Statistics, etc.)
│
├── lib/
│   └── prisma.ts                  # Configuration Prisma
│
├── prisma/
│   ├── schema.prisma              # Schéma de la base de données
│   └── dev.db                     # Base SQLite
│
├── ARCHITECTURE.md                # 📖 Documentation détaillée
├── exemple-import.json            # Fichier exemple pour l'import
└── package.json
```

> **📖 Documentation complète** : Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour les détails sur chaque composant

## 🎨 Caractéristiques du design

- **Dégradés premium** : Indigo-purple sur toute l'interface
- **Cartes statistiques animées** : Avec icônes et pourcentages
- **Layout avancé** : Formulaire sticky + liste responsive
- **Animations fluides** : FadeIn progressif sur les lignes
- **Badges colorés** : Avec dégradés pour Masculin/Féminin
- **Scrollbar personnalisée** : Avec dégradé assorti
- **Modale élégante** : Pour la prévisualisation d'import
- **Icônes SVG partout** : Interface visuelle moderne
- **Effets hover sophistiqués** : Transformations et ombres
- **Messages contextuels** : Erreurs et succès stylisés

## 🏗️ Architecture

### Modularité

L'application suit une **architecture modulaire** avec :

- **7 composants réutilisables** dans `/components`
- **Types TypeScript partagés** dans `/types`
- **Séparation des responsabilités** claire
- **Props bien typées** pour chaque composant

### Composants

1. **StatisticsCards** - Affichage des statistiques
2. **ImportExportButtons** - Actions import/export
3. **PersonForm** - Formulaire CRUD
4. **SearchFilters** - Recherche et filtres
5. **PersonTable** - Liste des personnes
6. **ImportModal** - Prévisualisation import
7. **Footer** - Crédit développeur

### Avantages

- ✅ **Maintenabilité** : Code organisé et facile à modifier
- ✅ **Réutilisabilité** : Composants indépendants
- ✅ **Testabilité** : Composants isolés testables
- ✅ **Scalabilité** : Structure extensible
- ✅ **Performance** : Optimisations avec useMemo

## 🔄 Flux de travail

### Opérations CRUD

1. **Ajout** : Remplissez le formulaire et cliquez sur "Ajouter"
2. **Modification** : Cliquez sur "Modifier", les champs se remplissent automatiquement
3. **Suppression** : Cliquez sur "Supprimer" et confirmez
4. **Recherche** : Tapez dans la barre de recherche pour filtrer
5. **Filtre** : Sélectionnez un sexe dans le menu déroulant

### Import/Export

#### 📤 Exporter vos données

1. Cliquez sur **"Exporter"** en haut à droite
2. Un fichier JSON est téléchargé automatiquement
3. Contient toutes vos données + métadonnées

#### 📥 Importer des données

1. Cliquez sur **"Importer"**
2. Sélectionnez un fichier JSON
3. **Prévisualisation automatique** s'affiche :
   - ✅ Validation du schéma
   - 📊 Statistiques (total, valides, invalides)
   - 👁️ Aperçu des 5 premiers enregistrements
   - ⚠️ Liste des erreurs si données incompatibles
4. Si valide, cliquez sur "Importer X enregistrement(s)"
5. Les données sont ajoutées à la base

### Format JSON attendu

```json
[
  {
    "nom": "Kabongo",
    "postnom": "Mukendi",
    "prenom": "Jean",
    "sexe": "Masculin"
  },
  {
    "nom": "Tshimanga",
    "postnom": "Kasongo",
    "prenom": "Marie",
    "sexe": "Féminin"
  }
]
```

**Règles importantes :**

- Tous les champs sont obligatoires
- `sexe` doit être exactement "Masculin" ou "Féminin"
- Le fichier doit contenir un tableau JSON valide
- Utilisez `exemple-import.json` comme référence

## 📊 Statistiques

L'application affiche en temps réel :

- **Total** de personnes enregistrées
- Nombre de **Masculin** avec pourcentage
- Nombre de **Féminin** avec pourcentage
- Nombre de résultats filtrés

## 👨‍💻 Créé par

**Gad Ntenta**

- Portfolio : [https://gadntenta.vercel.app/](https://gadntenta.vercel.app/)
- Email : gadntenta243@gmail.com
- Téléphone : +243 894 607 844
