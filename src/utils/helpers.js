import { TITLES, MOODS, BADGES } from './constants'

// Générer un ID unique
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Formater une date
export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('fr-FR', options)
}

// Obtenir le titre d'un joueur selon ses victoires
export const getPlayerTitle = (wins) => {
  let title = TITLES[0].title
  for (const t of TITLES) {
    if (wins >= t.min) {
      title = t.title
    }
  }
  return title
}

// Obtenir l'emoji d'une ambiance
export const getMoodEmoji = (mood) => {
  const found = MOODS.find(m => m.value === mood)
  return found?.emoji || '🎮'
}

// Obtenir le texte d'une ambiance
export const getMoodText = (mood) => {
  const found = MOODS.find(m => m.value === mood)
  return found?.text || 'Partie de cartes'
}

// Obtenir les infos d'un badge
export const getBadgeInfo = (badge) => {
  const found = BADGES.find(b => b.value === badge)
  return found || { icon: '🏷️', name: badge }
}

// Calculer les stats d'un joueur
export const calculatePlayerStats = (playerId, games) => {
  const wins = games.filter(g => g.winnerId === playerId).length
  const gamesPlayed = games.filter(
    g => g.winnerId === playerId || g.participants?.includes(playerId)
  ).length
  const winRate = gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0
  
  return { wins, gamesPlayed, winRate }
}

// Calculer la série max d'un joueur
export const calculateMaxStreak = (playerId, games) => {
  const sortedGames = [...games].sort((a, b) => new Date(a.date) - new Date(b.date))
  let currentStreak = 0
  let maxStreak = 0
  
  for (const game of sortedGames) {
    if (game.winnerId === playerId) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  }
  
  return { currentStreak, maxStreak }
}

// Calculer la série actuelle (depuis la dernière partie)
export const calculateCurrentStreak = (games) => {
  if (games.length === 0) return { player: null, streak: 0 }
  
  const sortedGames = [...games].sort((a, b) => new Date(b.date) - new Date(a.date))
  const lastWinner = sortedGames[0].winnerId
  let streak = 0
  
  for (const game of sortedGames) {
    if (game.winnerId === lastWinner) {
      streak++
    } else {
      break
    }
  }
  
  return { player: lastWinner, streak }
}

