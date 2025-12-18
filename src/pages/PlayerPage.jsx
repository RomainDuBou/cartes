import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Users } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { useToast } from '../components/ui'
import { PlayerList, PlayerProfile } from '../components/player'

export function PlayerPage() {
  const { playerId } = useParams()
  const navigate = useNavigate()
  const { players, createPlayer, updatePlayer, deletePlayer, getPlayer } = useGame()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const player = playerId ? getPlayer(playerId) : null

  const handleCreatePlayer = async (e) => {
    e.preventDefault()
    const name = e.target.playerName.value.trim()
    
    if (!name) {
      showToast('Le nom est requis', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      const newPlayer = await createPlayer(name)
      e.target.reset()
      showToast(`${newPlayer.emoji} ${newPlayer.name} a rejoint la partie !`)
      navigate(`/players/${newPlayer.id}`)
    } catch (error) {
      showToast('Erreur lors de la création', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdatePlayer = async (updates) => {
    try {
      await updatePlayer(playerId, updates)
      showToast('Profil mis à jour !')
    } catch (error) {
      showToast('Erreur lors de la mise à jour', 'error')
    }
  }

  const handleDeletePlayer = async () => {
    try {
      await deletePlayer(playerId)
      showToast('Joueur supprimé')
      navigate('/players')
    } catch (error) {
      showToast('Erreur lors de la suppression', 'error')
    }
  }

  // Afficher le profil si un ID est fourni et le joueur existe
  if (playerId && player) {
    return (
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <PlayerProfile 
          player={player}
          onUpdate={handleUpdatePlayer}
          onDelete={handleDeletePlayer}
        />
      </main>
    )
  }

  // Sinon afficher la liste des joueurs
  return (
    <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl font-bold text-white flex items-center gap-3">
          <Users className="w-8 h-8 text-gold" /> Joueurs
        </h2>
      </div>
      
      <PlayerList onCreatePlayer={handleCreatePlayer} />
    </main>
  )
}

