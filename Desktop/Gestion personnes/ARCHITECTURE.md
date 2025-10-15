# Architecture Modulaire

## 📁 Structure du projet

```
/Users/mac/Desktop/Gestion personnes/
├── app/
│   ├── api/
│   │   └── persons/
│   │       ├── route.ts              # GET & POST endpoints
│   │       ├── [id]/route.ts         # PUT & DELETE endpoints
│   │       ├── export/route.ts       # Export JSON endpoint
│   │       └── import/route.ts       # Import & validation endpoint
│   ├── globals.css                   # Styles globaux + animations
│   ├── layout.tsx                    # Layout racine
│   └── page.tsx                      # Page principale (orchestration)
│
├── components/                        # 🎯 Composants réutilisables
│   ├── StatisticsCards.tsx           # Cartes de statistiques
│   ├── ImportExportButtons.tsx       # Boutons Import/Export
│   ├── PersonForm.tsx                # Formulaire ajout/modification
│   ├── SearchFilters.tsx             # Barre de recherche + filtre
│   ├── PersonTable.tsx               # Tableau des personnes
│   ├── ImportModal.tsx               # Modale de prévisualisation
│   └── Footer.tsx                    # Footer avec crédit
│
├── types/                             # 📝 Types TypeScript partagés
│   └── person.ts                     # Interfaces & types
│
├── hooks/                             # 🎣 Hooks personnalisés
│   ├── usePersons.ts                 # CRUD operations
│   ├── useFilters.ts                 # Recherche & filtres
│   ├── useImportExport.ts            # Import/Export
│   └── index.ts                      # Exports groupés
│
├── lib/
│   └── prisma.ts                     # Configuration Prisma
│
├── prisma/
│   ├── schema.prisma                 # Schéma de la BDD
│   └── dev.db                        # Base SQLite
│
├── exemple-import.json               # Fichier exemple
└── package.json
```

---

## 🎣 Hooks Personnalisés

### 1. **usePersons.ts**

**Responsabilité** : Gestion des opérations CRUD sur les personnes

- **Retour** :
  - `persons`: Liste des personnes
  - `loading`: État de chargement
  - `error`: Message d'erreur
  - `setError`: Modifier l'erreur
  - `stats`: Statistiques calculées
  - `createPerson()`: Créer une personne
  - `updatePerson()`: Mettre à jour
  - `deletePerson()`: Supprimer
  - `refreshPersons()`: Recharger
- **Features** :
  - Chargement automatique au montage
  - Gestion des erreurs
  - Calcul automatique des stats avec useMemo

---

### 2. **useFilters.ts**

**Responsabilité** : Gestion de la recherche et des filtres

- **Paramètres** :
  - `persons`: Liste complète des personnes
- **Retour** :
  - `searchTerm`: Terme de recherche
  - `setSearchTerm`: Modifier la recherche
  - `sexFilter`: Filtre sexe actuel
  - `setSexFilter`: Modifier le filtre
  - `filteredPersons`: Personnes filtrées (useMemo)
- **Features** :
  - Filtrage optimisé avec useMemo
  - Recherche sur nom/postnom/prénom
  - Filtre par sexe

---

### 3. **useImportExport.ts**

**Responsabilité** : Gestion de l'import/export de données

- **Paramètres** :
  - `onImportSuccess`: Callback après import réussi
- **Retour** :
  - `showImportModal`: État de la modale
  - `importValidation`: Résultat validation
  - `importLoading`: État chargement
  - `error`: Message d'erreur
  - `handleExport()`: Exporter en JSON
  - `handleFileSelect()`: Sélectionner fichier
  - `handleConfirmImport()`: Confirmer import
  - `handleCancelImport()`: Annuler import
- **Features** :
  - Validation avant import
  - Téléchargement automatique export
  - Gestion des erreurs

---

## 🎯 Composants

### 1. **StatisticsCards.tsx**

**Responsabilité** : Afficher les statistiques en temps réel

- **Props** :
  - `stats`: { total, masculin, feminin }
- **Features** :
  - 3 cartes avec dégradés (bleu, indigo, rose)
  - Calcul automatique des pourcentages
  - Icônes SVG
  - Animations hover

---

### 2. **ImportExportButtons.tsx**

**Responsabilité** : Gérer les actions d'import/export

- **Props** :
  - `onFileSelect`: Callback pour sélection fichier
  - `onExport`: Callback pour export
- **Features** :
  - Input file caché avec label personnalisé
  - Bouton export avec dégradé vert
  - Icônes cloud upload/download

---

### 3. **PersonForm.tsx**

**Responsabilité** : Formulaire d'ajout/modification

- **Props** :
  - `formData`: Données du formulaire
  - `editingId`: ID en cours d'édition (null = création)
  - `loading`: État de chargement
  - `error`: Message d'erreur
  - `onSubmit`: Callback soumission
  - `onChange`: Callback changement champ
  - `onCancel`: Callback annulation
- **Features** :
  - 4 champs (nom, postnom, prenom, sexe)
  - Validation visuelle
  - Mode sticky (reste visible au scroll)
  - Bouton annuler si mode édition
  - Spinner de chargement

---

### 4. **SearchFilters.tsx**

**Responsabilité** : Recherche et filtrage

- **Props** :
  - `searchTerm`: Terme de recherche
  - `sexFilter`: Filtre sexe actuel
  - `onSearchChange`: Callback recherche
  - `onFilterChange`: Callback filtre
  - `resultCount`: Nombre de résultats
- **Features** :
  - Barre de recherche en temps réel
  - Bouton clear (X) si texte saisi
  - Menu déroulant filtre sexe
  - Badge compteur de résultats
  - Icônes contextuelles

---

### 5. **PersonTable.tsx**

**Responsabilité** : Afficher la liste des personnes

- **Props** :
  - `persons`: Tableau de personnes
  - `onEdit`: Callback édition
  - `onDelete`: Callback suppression
- **Features** :
  - Table responsive
  - État vide élégant
  - Badges colorés pour sexe
  - Boutons d'action avec icônes
  - Animation fadeIn progressive
  - Hover effects

---

### 6. **ImportModal.tsx**

**Responsabilité** : Prévisualisation avant import

- **Props** :
  - `validation`: Résultat de validation
  - `loading`: État de chargement
  - `onConfirm`: Callback confirmation
  - `onCancel`: Callback annulation
- **Features** :
  - Validation intelligente
  - Messages contextuels (vert/rouge)
  - Statistiques (total/valides/invalides)
  - Aperçu tableau (5 premiers)
  - Liste des erreurs
  - Bouton import conditionnel

---

### 7. **Footer.tsx**

**Responsabilité** : Footer avec crédit développeur

- **Props** : Aucune (composant autonome)
- **Features** :
  - Lien vers portfolio
  - Informations de contact
  - Copyright
  - Design premium

---

## 📝 Types TypeScript (`types/person.ts`)

### Interfaces principales :

```typescript
// Personne complète (avec ID)
interface Person {
  id: number;
  nom: string;
  postnom: string;
  prenom: string;
  sexe: string;
}

// Données du formulaire (sans ID)
interface PersonFormData {
  nom: string;
  postnom: string;
  prenom: string;
  sexe: string;
}

// Statistiques
interface Statistics {
  total: number;
  masculin: number;
  feminin: number;
}

// Validation d'import
interface ImportValidation {
  isValid: boolean;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  errors?: string[];
  hasMoreErrors?: boolean;
  preview?: Person[];
}
```

---

## 🔄 Flux de données

### Page principale (`app/page.tsx`)

**Rôle** : Orchestrateur - gère l'état global et coordonne les composants

```
État global (useState):
├── persons          → Liste complète
├── formData         → Données du formulaire
├── editingId        → ID en cours d'édition
├── loading          → État de chargement
├── error            → Messages d'erreur
├── searchTerm       → Recherche
├── sexFilter        → Filtre sexe
├── importData       → Données à importer
└── importValidation → Résultat validation

Calculs dérivés (useMemo):
├── filteredPersons  → Personnes filtrées
└── stats            → Statistiques calculées

API Calls:
├── fetchPersons()      → GET /api/persons
├── handleSubmit()      → POST/PUT /api/persons
├── handleDelete()      → DELETE /api/persons/:id
├── handleExport()      → GET /api/persons/export
└── handleFileSelect()  → POST /api/persons/import
```

### Version alternative avec hooks (`app/page-with-hooks.tsx`)

**Rôle** : Orchestrateur ultra-léger - utilise les hooks pour la logique

```
Hooks personnalisés:
├── usePersons()       → CRUD + stats
├── useFilters()       → Recherche + filtrage
└── useImportExport()  → Import/Export

État local minimal:
├── formData   → Données du formulaire
└── editingId  → ID en cours d'édition

Avantages:
✅ Logique métier réutilisable
✅ Page plus simple (~150 lignes au lieu de 350)
✅ Tests unitaires plus faciles
✅ Séparation des responsabilités parfaite
```

---

## 🎨 Conventions de design

### Couleurs

- **Primary** : Indigo (600-700)
- **Secondary** : Purple (600-700)
- **Success** : Green (600-700)
- **Danger** : Red (600-700)
- **Info** : Blue (500-600)

### Espacements

- **Padding cards** : `p-6`
- **Gap grid** : `gap-4` ou `gap-6` ou `gap-8`
- **Rounded** : `rounded-xl` ou `rounded-2xl`

### Animations

- **Transitions** : `transition-all duration-200`
- **Hover shadows** : `hover:shadow-lg`
- **Transform** : `hover:-translate-y-0.5`

---

## 🚀 Avantages de cette architecture

### ✅ Maintenabilité

- Chaque composant a une responsabilité unique
- Code facile à lire et à comprendre
- Modifications isolées
- **Hooks** : Logique métier centralisée

### ✅ Réutilisabilité

- Composants indépendants
- Props bien typées
- Peut être réutilisé dans d'autres projets
- **Hooks** : Logique réutilisable entre pages

### ✅ Testabilité

- Chaque composant peut être testé isolément
- Props bien définies facilitent les tests
- Logique métier séparée de la présentation
- **Hooks** : Tests unitaires simplifiés

### ✅ Scalabilité

- Facile d'ajouter de nouveaux composants
- Structure claire et organisée
- Types partagés évitent la duplication
- **Hooks** : Logique extensible

### ✅ Performance

- Composants optimisés avec useMemo
- Réduction des re-renders inutiles
- Code splitting automatique par Next.js
- **Hooks** : Mémorisation intelligente

---

## 🔧 Comment ajouter un nouveau composant

1. **Créer le fichier** dans `components/`

```typescript
// components/MonComposant.tsx
interface MonComposantProps {
  prop1: string;
  prop2: number;
}

export default function MonComposant({ prop1, prop2 }: MonComposantProps) {
  return <div>{/* JSX */}</div>;
}
```

2. **Exporter** dans `components/index.ts`

```typescript
export { default as MonComposant } from "./MonComposant";
```

3. **Ajouter les types** si nécessaire dans `types/`

4. **Importer** dans `app/page.tsx`

```typescript
import { MonComposant } from "@/components";
```

5. **Utiliser** dans le JSX

```tsx
<MonComposant prop1="value" prop2={42} />
```

---

## 🎣 Comment ajouter un nouveau hook

1. **Créer le fichier** dans `hooks/`

```typescript
// hooks/useMonHook.ts
export function useMonHook(param: string) {
  const [state, setState] = useState("");

  const action = () => {
    // Logique
  };

  return { state, action };
}
```

2. **Exporter** dans `hooks/index.ts`

```typescript
export { useMonHook } from "./useMonHook";
```

3. **Utiliser** dans un composant

```typescript
import { useMonHook } from "@/hooks";

function MaPage() {
  const { state, action } = useMonHook("param");
  // ...
}
```

---

## 📚 Bonnes pratiques

### ✅ À faire

- Un composant = une responsabilité
- Props typées avec TypeScript
- Noms descriptifs et clairs
- Commenter le code complexe
- Utiliser useMemo pour calculs coûteux

### ❌ À éviter

- Composants trop gros (>300 lignes)
- Props non typées (any)
- Logique métier dans les composants
- Duplication de code
- Styles inline (utiliser Tailwind)

---

## 🎓 Créé par Gad Ntenta

Architecture modulaire suivant les meilleures pratiques React/Next.js
