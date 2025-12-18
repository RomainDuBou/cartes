# 🃏 Géan Bresilen

Tableau de victoires pour vos parties de cartes entre amis !

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build
```

## ✨ Fonctionnalités

- 👑 **Classement** - Podium et tableau des meilleurs joueurs
- 📊 **Statistiques** - Nombre de parties, séries, taux de victoire
- 🎮 **Enregistrement** - Ajouter des parties avec lieu, ambiance, badges
- 👤 **Profils** - Créer et personnaliser les profils des joueurs
- 💾 **Persistance** - Données sauvegardées localement

## 🛠️ Stack Technique

- **React 18** - UI Library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **LocalStorage** - Persistance des données

## 📁 Structure du Projet

```
src/
├── components/
│   ├── ui/           # Composants réutilisables (Button, Card, Modal, Toast)
│   ├── layout/       # Layout (Navbar, Footer, Background)
│   ├── home/         # Composants de la page d'accueil
│   ├── game/         # Modal nouvelle partie
│   └── player/       # Composants profil joueur
├── context/          # Context React (GameContext)
├── hooks/            # Custom hooks (useLocalStorage)
├── pages/            # Pages (HomePage, PlayerPage)
└── utils/            # Helpers et constantes
```

## 🎨 Design

- Police titres: **Cinzel** (élégante, style casino)
- Police corps: **Quicksand** (moderne, lisible)
- Thème: Sombre avec accents dorés
- Icônes: Lucide React

---

🃏 Que le meilleur gagne !

