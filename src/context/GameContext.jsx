import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore'
import { generateId, calculateMaxStreak } from '../utils/helpers'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [players, setPlayers] = useState([])
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  // Écouter les changements en temps réel depuis Firebase
  useEffect(() => {
    // Écouter les joueurs
    const unsubscribePlayers = onSnapshot(
      collection(db, 'players'),
      (snapshot) => {
        const playersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPlayers(playersData)
      }
    )

    // Écouter les parties (triées par date)
    const unsubscribeGames = onSnapshot(
      query(collection(db, 'games'), orderBy('createdAt', 'asc')),
      (snapshot) => {
        const gamesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setGames(gamesData)
        setLoading(false)
      }
    )

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
            await updateDoc(doc(db, 'players', player.id), {
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
      const docRef = await addDoc(collection(db, 'players'), playerData)
      return { id: docRef.id, ...playerData }
    } catch (error) {
      console.error('Erreur création joueur:', error)
      throw error
    }
  }

  // Mettre à jour un joueur
  const updatePlayer = async (playerId, updates) => {
    try {
      await updateDoc(doc(db, 'players', playerId), updates)
    } catch (error) {
      console.error('Erreur mise à jour joueur:', error)
      throw error
    }
  }

  // Supprimer un joueur
  const deletePlayer = async (playerId) => {
    try {
      await deleteDoc(doc(db, 'players', playerId))
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
      const docRef = await addDoc(collection(db, 'games'), game)
      return { id: docRef.id, ...game }
    } catch (error) {
      console.error('Erreur ajout partie:', error)
      throw error
    }
  }

  // Supprimer une partie
  const deleteGame = async (gameId) => {
    try {
      await deleteDoc(doc(db, 'games', gameId))
    } catch (error) {
      console.error('Erreur suppression partie:', error)
      throw error
    }
  }

  // Modifier une partie
  const updateGame = async (gameId, updates) => {
    try {
      await updateDoc(doc(db, 'games', gameId), updates)
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
