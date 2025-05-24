# Portfolio de Serigne Moustapha Diouf

Ce projet est un portfolio personnel moderne et responsive présentant les compétences, projets, expériences et formations de Serigne Moustapha Diouf, développeur Web & Mobile.

## 🚀 Technologies utilisées

- **React** - Bibliothèque JavaScript pour créer l'interface utilisateur
- **TypeScript** - Superset JavaScript avec typage statique
- **Vite** - Outil de build rapide et moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Bibliothèque d'animations pour React
- **React Intersection Observer** - Pour les animations au défilement
- **Lucide React** - Bibliothèque d'icônes

## 📋 Fonctionnalités

- Design responsive pour tous les appareils
- Mode sombre/clair avec détection automatique des préférences système
- Animations fluides et interactives
- Sections organisées par thématique (À propos, Compétences, Projets, etc.)
- Performance optimisée grâce à Vite

## 🛠️ Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé (v14.0.0 ou supérieur).

1. Clonez ce dépôt
   ```bash
   git clone <url-du-dépôt>
   cd portfolio
   ```

2. Installez les dépendances
   ```bash
   npm install
   ```

3. Démarrez le serveur de développement
   ```bash
   npm run dev
   ```

4. Ouvrez votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du projet

```
├── public/             # Ressources statiques
├── src/                # Code source
│   ├── components/     # Composants React
│   ├── data/           # Données du portfolio
│   ├── types/          # Définitions de types TypeScript
│   ├── App.tsx         # Composant principal
│   ├── index.css       # Styles globaux
│   └── main.tsx        # Point d'entrée
├── index.html          # Template HTML
├── tailwind.config.js  # Configuration Tailwind CSS
└── vite.config.ts      # Configuration Vite
```

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile le projet pour la production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run preview` - Prévisualise la version de production

## 🌐 Déploiement

Pour créer une version de production :

```bash
npm run build
```

Les fichiers générés se trouveront dans le dossier `dist` et pourront être déployés sur n'importe quel hébergeur statique comme Netlify, Vercel, GitHub Pages, etc.

## 📄 Licence

Ce projet est sous licence MIT.

---

Créé avec ❤️ par Serigne Moustapha Diouf
