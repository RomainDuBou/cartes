// Emojis disponibles pour les avatars
export const AVATAR_EMOJIS = [
  '😎', '🤠', '🥸', '🤓', '😈', '👻', '🤖', '👽', 
  '🎃', '🦊', '🐺', '🦁', '🐯', '🦄', '🐲', '👑', 
  '🎭', '🃏', '♠️', '♥️', '♣️', '♦️', '🎯', '🎪'
]

// Titres selon le nombre de victoires
export const TITLES = [
  { min: 0, title: "Novice des Cartes" },
  { min: 1, title: "Apprenti Joueur" },
  { min: 3, title: "Joueur Régulier" },
  { min: 5, title: "As des Cartes" },
  { min: 10, title: "Maître du Jeu" },
  { min: 20, title: "Grand Champion" },
  { min: 50, title: "Légende Vivante" },
  { min: 100, title: "Dieu des Cartes" }
]

// Types de jeux
export const GAME_TYPES = [
  { value: 'belote', label: 'Belote' },
  { value: 'tarot', label: 'Tarot' },
  { value: 'gin-bresilien', label: 'Gin Brésilien' },
  { value: 'poker', label: 'Poker' },
  { value: 'uno', label: 'UNO' },
  { value: 'rami', label: 'Rami' },
  { value: 'bataille', label: 'Bataille' },
  { value: 'president', label: 'Président' },
  { value: 'coinche', label: 'Coinche' },
  { value: 'bridge', label: 'Bridge' },
  { value: 'blackjack', label: 'Blackjack' },
  { value: 'autre', label: 'Autre' },
]

// Ambiances
export const MOODS = [
  { value: 'epic', label: '🔥 Épique', emoji: '🔥', text: 'Victoire épique' },
  { value: 'chill', label: '😎 Tranquille', emoji: '😎', text: 'Partie tranquille' },
  { value: 'intense', label: '⚡ Intense', emoji: '⚡', text: 'Partie intense' },
  { value: 'funny', label: '😂 Hilarant', emoji: '😂', text: 'Partie hilarante' },
  { value: 'dramatic', label: '🎭 Dramatique', emoji: '🎭', text: 'Fin dramatique' },
  { value: 'revenge', label: '😈 Revanche', emoji: '😈', text: 'Revanche réussie' },
  { value: 'chaos', label: '🌪️ Chaotique', emoji: '🌪️', text: 'Chaos total' },
  { value: 'tense', label: '😰 Stressant', emoji: '😰', text: 'Partie stressante' },
  { value: 'legendary', label: '⭐ Légendaire', emoji: '⭐', text: 'Partie légendaire' },
]

// Badges avec descriptions précises et uniques
export const BADGES = [
  // === PERFORMANCE ===
  { 
    value: 'comeback', 
    icon: '🔄', 
    name: 'Le Phénix', 
    category: 'performance',
    description: 'Remporter la victoire après avoir été en très mauvaise posture pendant la partie.'
  },
  { 
    value: 'flawless', 
    icon: '💎', 
    name: 'Sans Faute', 
    category: 'performance',
    description: 'Gagner sans commettre une seule erreur stratégique notable.'
  },
  { 
    value: 'domination', 
    icon: '👊', 
    name: 'Domination Totale', 
    category: 'performance',
    description: 'Écraser tous les adversaires avec un écart de score significatif.'
  },
  { 
    value: 'clutch', 
    icon: '🎯', 
    name: 'Sang Froid', 
    category: 'performance',
    description: 'Réussir un coup décisif sous pression extrême qui retourne la partie.'
  },
  { 
    value: 'speedrun', 
    icon: '⚡', 
    name: 'Éclair', 
    category: 'performance',
    description: 'Remporter la partie en un temps record, bien plus vite que la normale.'
  },

  // === CHANCE & DESTIN ===
  { 
    value: 'lucky-draw', 
    icon: '🍀', 
    name: 'Main du Destin', 
    category: 'chance',
    description: 'Recevoir une main ou des cartes exceptionnellement favorables dès le départ.'
  },
  { 
    value: 'miracle', 
    icon: '✨', 
    name: 'Miracle', 
    category: 'chance',
    description: 'Gagner grâce à un tirage ou un événement improbable au dernier moment.'
  },
  { 
    value: 'against-odds', 
    icon: '🎲', 
    name: 'Contre Toute Attente', 
    category: 'chance',
    description: 'Victoire alors que les probabilités étaient clairement contre vous.'
  },

  // === STRATÉGIE ===
  { 
    value: 'mastermind', 
    icon: '🧠', 
    name: 'Cerveau', 
    category: 'strategie',
    description: 'Victoire obtenue grâce à une stratégie élaborée et parfaitement exécutée.'
  },
  { 
    value: 'bluffer', 
    icon: '🎭', 
    name: 'Maître du Bluff', 
    category: 'strategie',
    description: 'Gagner en faisant croire aux adversaires quelque chose de faux.'
  },
  { 
    value: 'trap', 
    icon: '🕸️', 
    name: 'Le Piège', 
    category: 'strategie',
    description: 'Tendre un piège à un adversaire qui tombe dedans et perd la partie.'
  },
  { 
    value: 'calculator', 
    icon: '🔢', 
    name: 'Calculateur', 
    category: 'strategie',
    description: 'Compter les cartes ou calculer les probabilités pour prendre l\'avantage.'
  },
  { 
    value: 'reader', 
    icon: '👁️', 
    name: 'Lecteur d\'Âmes', 
    category: 'strategie',
    description: 'Deviner le jeu des adversaires en lisant leurs réactions et comportements.'
  },

  // === TIMING ===
  { 
    value: 'photo-finish', 
    icon: '📸', 
    name: 'Photo Finish', 
    category: 'timing',
    description: 'Gagner avec le plus petit écart possible, à un cheveu de la défaite.'
  },
  { 
    value: 'last-card', 
    icon: '🃏', 
    name: 'Dernière Carte', 
    category: 'timing',
    description: 'La victoire s\'est jouée littéralement sur la toute dernière carte.'
  },
  { 
    value: 'overtime', 
    icon: '⏰', 
    name: 'Prolongations', 
    category: 'timing',
    description: 'Partie qui a duré beaucoup plus longtemps que prévu.'
  },
  { 
    value: 'marathon', 
    icon: '🏃', 
    name: 'Marathon', 
    category: 'timing',
    description: 'Partie exceptionnellement longue, une vraie épreuve d\'endurance.'
  },

  // === CONTEXTE SOCIAL ===
  { 
    value: 'underdog', 
    icon: '🐕', 
    name: 'Outsider', 
    category: 'social',
    description: 'Gagner alors que personne ne vous donnait favori avant la partie.'
  },
  { 
    value: 'giant-slayer', 
    icon: '⚔️', 
    name: 'Tueur de Géants', 
    category: 'social',
    description: 'Battre le joueur considéré comme le meilleur ou le plus expérimenté.'
  },
  { 
    value: 'redemption', 
    icon: '🔥', 
    name: 'Rédemption', 
    category: 'social',
    description: 'Gagner après une série de défaites consécutives.'
  },
  { 
    value: 'nemesis', 
    icon: '💀', 
    name: 'Némésis', 
    category: 'social',
    description: 'Battre un adversaire qui vous avait battu plusieurs fois auparavant.'
  },
  { 
    value: 'teacher', 
    icon: '📚', 
    name: 'Le Professeur', 
    category: 'social',
    description: 'Gagner tout en expliquant vos coups et en enseignant aux autres.'
  },

  // === STYLE DE JEU ===
  { 
    value: 'showman', 
    icon: '🎪', 
    name: 'Showman', 
    category: 'style',
    description: 'Gagner avec panache, en faisant le spectacle et en divertissant la galerie.'
  },
  { 
    value: 'silent', 
    icon: '🤫', 
    name: 'L\'Ombre', 
    category: 'style',
    description: 'Victoire obtenue en restant discret, sans attirer l\'attention jusqu\'au bout.'
  },
  { 
    value: 'aggressive', 
    icon: '🦈', 
    name: 'Le Requin', 
    category: 'style',
    description: 'Style de jeu très agressif, mettant constamment la pression sur les adversaires.'
  },
  { 
    value: 'patient', 
    icon: '🐢', 
    name: 'La Tortue', 
    category: 'style',
    description: 'Victoire obtenue en jouant prudemment et en attendant le bon moment.'
  },
  { 
    value: 'unpredictable', 
    icon: '🌀', 
    name: 'L\'Imprévisible', 
    category: 'style',
    description: 'Jouer de manière totalement imprévisible, déstabilisant tous les adversaires.'
  },

  // === MOMENTS SPÉCIAUX ===
  { 
    value: 'first-win', 
    icon: '🏆', 
    name: 'Première Victoire', 
    category: 'special',
    description: 'La toute première victoire d\'un joueur dans ce groupe.'
  },
  { 
    value: 'streak-breaker', 
    icon: '💥', 
    name: 'Briseur de Série', 
    category: 'special',
    description: 'Mettre fin à la série de victoires d\'un autre joueur.'
  },
  { 
    value: 'perfect-hand', 
    icon: '🌟', 
    name: 'Main Parfaite', 
    category: 'special',
    description: 'Obtenir une combinaison de cartes exceptionnellement rare.'
  },
  { 
    value: 'anniversary', 
    icon: '🎂', 
    name: 'Cadeau d\'Anniversaire', 
    category: 'special',
    description: 'Gagner le jour de son anniversaire.'
  },
  { 
    value: 'hat-trick', 
    icon: '🎩', 
    name: 'Coup du Chapeau', 
    category: 'special',
    description: 'Troisième victoire consécutive de la soirée.'
  },

  // === AMBIANCE ===
  { 
    value: 'tension', 
    icon: '😰', 
    name: 'Haute Tension', 
    category: 'ambiance',
    description: 'Partie où la tension était palpable du début à la fin.'
  },
  { 
    value: 'laughs', 
    icon: '😂', 
    name: 'Fou Rire', 
    category: 'ambiance',
    description: 'Partie marquée par des moments hilarants et des fous rires.'
  },
  { 
    value: 'drama', 
    icon: '🎬', 
    name: 'Digne d\'un Film', 
    category: 'ambiance',
    description: 'Rebondissements dignes d\'un scénario de cinéma.'
  },
  { 
    value: 'salty', 
    icon: '🧂', 
    name: 'Récolte de Sel', 
    category: 'ambiance',
    description: 'Victoire qui a généré beaucoup de frustration chez les perdants.'
  },
  { 
    value: 'respect', 
    icon: '🤝', 
    name: 'Respect Mutuel', 
    category: 'ambiance',
    description: 'Partie fair-play où tous les joueurs se sont respectés.'
  },

  // === CONDITIONS ===
  { 
    value: 'night-owl', 
    icon: '🦉', 
    name: 'Oiseau de Nuit', 
    category: 'conditions',
    description: 'Victoire obtenue très tard dans la nuit (après minuit).'
  },
  { 
    value: 'early-bird', 
    icon: '🌅', 
    name: 'Lève-Tôt', 
    category: 'conditions',
    description: 'Partie jouée tôt le matin.'
  },
  { 
    value: 'hangover', 
    icon: '🍺', 
    name: 'Lendemain Difficile', 
    category: 'conditions',
    description: 'Gagner malgré un état de fatigue ou les effets de la veille.'
  },
  { 
    value: 'focused', 
    icon: '🎯', 
    name: 'Concentration Absolue', 
    category: 'conditions',
    description: 'Victoire grâce à une concentration sans faille du début à la fin.'
  },
]

// Catégories de badges pour l'affichage
export const BADGE_CATEGORIES = [
  { value: 'performance', label: '🏅 Performance', description: 'Badges liés à la qualité de jeu et aux exploits' },
  { value: 'chance', label: '🎲 Chance & Destin', description: 'Quand la chance sourit au vainqueur' },
  { value: 'strategie', label: '🧠 Stratégie', description: 'Victoires tactiques et réfléchies' },
  { value: 'timing', label: '⏱️ Timing', description: 'Tout est une question de timing' },
  { value: 'social', label: '👥 Contexte Social', description: 'L\'histoire derrière la victoire' },
  { value: 'style', label: '🎨 Style de Jeu', description: 'Comment vous avez gagné' },
  { value: 'special', label: '⭐ Moments Spéciaux', description: 'Occasions uniques et mémorables' },
  { value: 'ambiance', label: '🎭 Ambiance', description: 'L\'atmosphère de la partie' },
  { value: 'conditions', label: '🌙 Conditions', description: 'Le contexte de la partie' },
]

// Couleurs des types de jeux
export const GAME_TYPE_COLORS = {
  'belote': 'bg-blue-500/20 text-blue-300',
  'tarot': 'bg-purple-500/20 text-purple-300',
  'poker': 'bg-red-500/20 text-red-300',
  'uno': 'bg-green-500/20 text-green-300',
  'rami': 'bg-orange-500/20 text-orange-300',
  'bataille': 'bg-pink-500/20 text-pink-300',
  'president': 'bg-yellow-500/20 text-yellow-300',
  'gin-bresilien': 'bg-amber-500/20 text-amber-300',
  'coinche': 'bg-indigo-500/20 text-indigo-300',
  'bridge': 'bg-teal-500/20 text-teal-300',
  'blackjack': 'bg-rose-500/20 text-rose-300',
  'autre': 'bg-gray-500/20 text-gray-300',
}

// Couleurs des catégories de badges
export const BADGE_CATEGORY_COLORS = {
  'performance': 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  'chance': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  'strategie': 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
  'timing': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  'social': 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
  'style': 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30',
  'special': 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
  'ambiance': 'from-red-500/20 to-pink-500/20 border-red-500/30',
  'conditions': 'from-slate-500/20 to-gray-500/20 border-slate-500/30',
}
