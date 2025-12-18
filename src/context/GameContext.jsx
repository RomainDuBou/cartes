import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { 
  ref, 
  onValue, 
  push, 
  set, 
  update, 
  remove 
} from 'firebase/database'
import { calculateMaxStreak } from '../utils/helpers'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [players, setPlayers] = useState([])
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  // Écouter les changements en temps réel depuis Firebase
  useEffect(() => {
    // Écouter les joueurs
    const playersRef = ref(db, 'players')
    const unsubscribePlayers = onValue(playersRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const playersData = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        setPlayers(playersData)
      } else {
        setPlayers([])
      }
    }, (error) => {
      console.error('Erreur chargement joueurs:', error)
      setLoading(false)
    })

    // Écouter les parties
    const gamesRef = ref(db, 'games')
    const unsubscribeGames = onValue(gamesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const gamesData = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        // Trier par date
        gamesData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        setGames(gamesData)
      } else {
        setGames([])
      }
      setLoading(false)
    }, (error) => {
      console.error('Erreur chargement parties:', error)
      setLoading(false)
    })

    // Cleanup
    return () => {
      unsubscribePlayers()
      unsubscribeGames()
    }
  }, [])

  // Recalculer les stats des joueurs quand les parties changent
  useEffect(() => {
    if (players.length > 0 && games.length > 0 && !loading) {
      players.forEach(async (player) => {
        const wins = games.filter(g => g.winnerId === player.id).length
        const { currentStreak, maxStreak } = calculateMaxStreak(player.id, games)
        
        // Mettre à jour seulement si les stats ont changé
        if (player.wins !== wins || player.maxStreak !== maxStreak || player.currentStreak !== currentStreak) {
          try {
            const playerRef = ref(db, `players/${player.id}`)
            await update(playerRef, {
              wins,
              currentStreak,
              maxStreak
            })
          } catch (error) {
            console.error('Erreur mise à jour stats:', error)
          }
        }
      })
    }
  }, [games, loading])

  // Créer un joueur
  const createPlayer = async (name, emoji = '🃏', description = '') => {
    try {
      const playerData = {
        name: name.trim(),
        emoji,
        description,
        createdAt: new Date().toISOString(),
        wins: 0,
        gamesPlayed: 0,
        maxStreak: 0,
        currentStreak: 0
      }
      const playersRef = ref(db, 'players')
      const newPlayerRef = push(playersRef)
      await set(newPlayerRef, playerData)
      return { id: newPlayerRef.key, ...playerData }
    } catch (error) {
      console.error('Erreur création joueur:', error)
      throw error
    }
  }

  // Mettre à jour un joueur
  const updatePlayer = async (playerId, updates) => {
    try {
      const playerRef = ref(db, `players/${playerId}`)
      await update(playerRef, updates)
    } catch (error) {
      console.error('Erreur mise à jour joueur:', error)
      throw error
    }
  }

  // Supprimer un joueur
  const deletePlayer = async (playerId) => {
    try {
      const playerRef = ref(db, `players/${playerId}`)
      await remove(playerRef)
    } catch (error) {
      console.error('Erreur suppression joueur:', error)
      throw error
    }
  }

  // Obtenir un joueur
  const getPlayer = (playerId) => {
    return players.find(p => p.id === playerId)
  }

  // Ajouter une partie
  const addGame = async (gameData) => {
    try {
      const game = {
        ...gameData,
        createdAt: new Date().toISOString()
      }
      const gamesRef = ref(db, 'games')
      const newGameRef = push(gamesRef)
      await set(newGameRef, game)
      return { id: newGameRef.key, ...game }
    } catch (error) {
      console.error('Erreur ajout partie:', error)
      throw error
    }
  }

  // Supprimer une partie
  const deleteGame = async (gameId) => {
    try {
      const gameRef = ref(db, `games/${gameId}`)
      await remove(gameRef)
    } catch (error) {
      console.error('Erreur suppression partie:', error)
      throw error
    }
  }

  // Modifier une partie
  const updateGame = async (gameId, updates) => {
    try {
      const gameRef = ref(db, `games/${gameId}`)
      await update(gameRef, updates)
    } catch (error) {
      console.error('Erreur modification partie:', error)
      throw error
    }
  }

  // Obtenir une partie
  const getGame = (gameId) => {
    return games.find(g => g.id === gameId)
  }

  const value = {
    players,
    games,
    loading,
    createPlayer,
    updatePlayer,
    deletePlayer,
    getPlayer,
    addGame,
    updateGame,
    getGame,
    deleteGame,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
