import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Target, Crown, Calendar, Clock, MapPin, Gamepad2, Trophy, X, Users, MessageSquare, Zap, Edit3, Sparkles, Dice6 } from 'lucide-react'
import { Modal, ModalBody, ModalFooter, Button } from '../ui'
import { useGame } from '../../context/GameContext'
import { GAME_TYPES, MOODS, BADGES } from '../../utils/constants'
import { getBadgeInfo } from '../../utils/helpers'

const initialFormData = {
  winnerId: '',
  date: new Date().toISOString().split('T')[0],
  time: '',
  place: '',
  gameType: 'belote',
  mood: 'epic',
  participants: [],
  badges: [],
  comment: '',
}

// Fonction pour générer des badges aléatoires
function generateRandomBadges(winnerId, games, mood, time) {
  const playerWins = games.filter(g => g.winnerId === winnerId).length
  const isFirstWin = playerWins === 0
  
  // Badges qui ne peuvent pas être tirés aléatoirement (contextuels)
  const contextualBadges = ['first-win', 'anniversary', 'night-owl', 'early-bird', 'streak-breaker', 'hat-trick']
  
  // Filtrer les badges disponibles
  const availableBadges = BADGES.filter(b => !contextualBadges.includes(b.value))
  
  // Nombre de badges aléatoires (1 à 3)
  const numBadges = Math.floor(Math.random() * 3) + 1
  
  // Mélanger et prendre les badges
  const shuffled = [...availableBadges].sort(() => Math.random() - 0.5)
  const randomBadges = shuffled.slice(0, numBadges).map(b => b.value)
  
  // Ajouter le badge première victoire si applicable
  if (isFirstWin) {
    randomBadges.unshift('first-win')
  }
  
  // Ajouter badge nuit/matin selon l'heure
  if (time) {
    const hour = parseInt(time.split(':')[0])
    if (hour >= 0 && hour < 6) {
      randomBadges.push('night-owl')
    } else if (hour >= 5 && hour < 8) {
      randomBadges.push('early-bird')
    }
  }
  
  // Vérifier si c'est une série de 3 victoires (hat-trick)
  const recentGames = games
    .filter(g => g.winnerId === winnerId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2)
  
  if (recentGames.length === 2) {
    // Vérifier si les 2 dernières parties étaient aussi des victoires
    // (la 3ème sera celle qu'on enregistre)
    randomBadges.push('hat-trick')
  }
  
  // Retourner les badges uniques
  return [...new Set(randomBadges)]
}

export function GameModal({ isOpen, onClose, onSuccess, editGame = null }) {
  const { players, games, addGame, updateGame } = useGame()
  const isEditing = !!editGame
  
  const [formData, setFormData] = useState(initialFormData)
  const [generatedBadges, setGeneratedBadges] = useState([])
  const [showBadges, setShowBadges] = useState(false)

  // Charger les données de la partie à éditer
  useEffect(() => {
    if (editGame) {
      setFormData({
        winnerId: editGame.winnerId || '',
        date: editGame.date || new Date().toISOString().split('T')[0],
        time: editGame.time || '',
        place: editGame.place || '',
        gameType: editGame.gameType || 'belote',
        mood: editGame.mood || 'epic',
        participants: editGame.participants || [],
        badges: editGame.badges || [],
        comment: editGame.comment || '',
      })
      setGeneratedBadges(editGame.badges || [])
      setShowBadges(true)
    } else {
      setFormData(initialFormData)
      setGeneratedBadges([])
      setShowBadges(false)
    }
  }, [editGame, isOpen])

  // Liste des lieux déjà utilisés
  const existingPlaces = [...new Set(games.map(g => g.place).filter(Boolean))]

  const triggerConfetti = () => {
    const colors = ['#D4AF37', '#FFD700', '#F4E4BA', '#FFA500']
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    })
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
    }, 200)
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })
    }, 400)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.winnerId) {
      alert('Veuillez sélectionner un vainqueur')
      return
    }

    try {
      if (isEditing) {
        await updateGame(editGame.id, { ...formData, badges: generatedBadges })
        onSuccess?.('Partie modifiée !')
      } else {
        // Générer les badges aléatoires pour une nouvelle partie
        const badges = generateRandomBadges(formData.winnerId, games, formData.mood, formData.time)
        await addGame({ ...formData, badges })
        triggerConfetti()
        
        // Afficher les badges obtenus
        setGeneratedBadges(badges)
        setShowBadges(true)
        
        // Message avec les badges
        const badgeNames = badges.map(b => getBadgeInfo(b).icon).join(' ')
        onSuccess?.(`🏆 Victoire enregistrée ! ${badgeNames}`)
      }
      
      setFormData(initialFormData)
      onClose()
    } catch (error) {
      alert('Erreur lors de l\'enregistrement')
      console.error(error)
    }
  }

  const toggleParticipant = (playerId) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.includes(playerId)
        ? prev.participants.filter(id => id !== playerId)
        : [...prev.participants, playerId]
    }))
  }

  // Pour le mode édition, permettre de relancer les badges
  const rerollBadges = () => {
    if (formData.winnerId) {
      const newBadges = generateRandomBadges(formData.winnerId, games, formData.mood, formData.time)
      setGeneratedBadges(newBadges)
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={isEditing ? <><Edit3 className="w-6 h-6" /> Modifier la partie</> : <><Target className="w-6 h-6" /> Nouvelle Victoire</>}
    >
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Vainqueur */}
            <div className="sm:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gold">
                <Crown className="w-4 h-4" /> Le Grand Vainqueur
              </label>
              <select 
                value={formData.winnerId}
                onChange={(e) => setFormData(prev => ({ ...prev, winnerId: e.target.value }))}
                required
                className="form-input"
              >
                <option value="">Sélectionner le champion...</option>
                {players.map(p => (
                  <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
                ))}
              </select>
              {players.length === 0 && (
                <p className="text-xs text-white/30">
                  Pas de joueur ? <a href="/players" className="text-gold hover:underline">Créer un profil</a>
                </p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <Calendar className="w-4 h-4" /> Date de la partie
              </label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
                className="form-input"
              />
            </div>

            {/* Heure */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <Clock className="w-4 h-4" /> Heure
              </label>
              <input 
                type="time" 
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="form-input"
              />
            </div>

            {/* Lieu */}
            <div className="sm:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <MapPin className="w-4 h-4" /> Lieu de la bataille
              </label>
              <input 
                type="text" 
                value={formData.place}
                onChange={(e) => setFormData(prev => ({ ...prev, place: e.target.value }))}
                placeholder="Ex: Chez Marcel, Le Bar du Coin..."
                className="form-input"
                list="places-list"
              />
              <datalist id="places-list">
                {existingPlaces.map(p => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            </div>

            {/* Type de jeu */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <Gamepad2 className="w-4 h-4" /> Jeu de cartes
              </label>
              <select 
                value={formData.gameType}
                onChange={(e) => setFormData(prev => ({ ...prev, gameType: e.target.value }))}
                className="form-input"
              >
                {GAME_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Ambiance */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <Zap className="w-4 h-4" /> Ambiance
              </label>
              <select 
                value={formData.mood}
                onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value }))}
                className="form-input"
              >
                {MOODS.map(mood => (
                  <option key={mood.value} value={mood.value}>{mood.label}</option>
                ))}
              </select>
            </div>

            {/* Participants */}
            <div className="sm:col-span-2 space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <Users className="w-4 h-4" /> Participants (les perdants 😢)
              </label>
              <div className="flex flex-wrap gap-2">
                {players.filter(p => p.id !== formData.winnerId).map(p => (
                  <motion.label 
                    key={p.id}
                    className={`badge-option ${formData.participants.includes(p.id) ? 'selected' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input 
                      type="checkbox"
                      checked={formData.participants.includes(p.id)}
                      onChange={() => toggleParticipant(p.id)}
                      className="hidden"
                    />
                    <span className="text-lg">{p.emoji}</span>
                    <span className="text-sm font-medium">{p.name}</span>
                  </motion.label>
                ))}
                {players.length <= 1 && (
                  <p className="text-white/30 text-sm">Ajoutez plus de joueurs</p>
                )}
              </div>
            </div>

            {/* Commentaire */}
            <div className="sm:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <MessageSquare className="w-4 h-4" /> Commentaire épique
              </label>
              <textarea 
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                rows={2}
                placeholder="Racontez cette victoire légendaire..."
                className="form-input resize-none"
              />
            </div>

            {/* Info badges aléatoires */}
            {!isEditing && (
              <div className="sm:col-span-2">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gold/10 to-amber-500/5 border border-gold/20">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Dice6 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gold">Badges aléatoires</p>
                    <p className="text-xs text-white/50">
                      Les badges seront tirés au sort automatiquement ! 🎲
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Afficher les badges en mode édition */}
            {isEditing && generatedBadges.length > 0 && (
              <div className="sm:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                    <Sparkles className="w-4 h-4" /> Badges obtenus
                  </label>
                  <motion.button
                    type="button"
                    onClick={rerollBadges}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold text-xs hover:bg-gold/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Dice6 className="w-4 h-4" />
                    Relancer
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {generatedBadges.map(badge => {
                    const info = getBadgeInfo(badge)
                    return (
                      <motion.div
                        key={badge}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl glass-gold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <span className="text-xl">{info.icon}</span>
                        <span className="text-sm font-medium text-white">{info.name}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" type="button" onClick={onClose}>
            <X className="w-4 h-4" /> Annuler
          </Button>
          <Button type="submit">
            {isEditing ? (
              <><Edit3 className="w-5 h-5" /> Enregistrer</>
            ) : (
              <><Trophy className="w-5 h-5" /> Enregistrer la victoire</>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
