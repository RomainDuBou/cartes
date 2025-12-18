import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Target, Crown, Calendar, Clock, MapPin, Gamepad2, Sparkles, Trophy, X, Users, MessageSquare, Zap } from 'lucide-react'
import { Modal, ModalBody, ModalFooter, Button } from '../ui'
import { useGame } from '../../context/GameContext'
import { GAME_TYPES, MOODS, BADGES } from '../../utils/constants'

export function NewGameModal({ isOpen, onClose, onSuccess }) {
  const { players, games, addGame } = useGame()
  
  const [formData, setFormData] = useState({
    winnerId: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    place: '',
    gameType: 'belote',
    mood: 'epic',
    participants: [],
    badges: [],
    comment: '',
  })

  // Liste des lieux déjà utilisés
  const existingPlaces = [...new Set(games.map(g => g.place).filter(Boolean))]

  const triggerConfetti = () => {
    // Confettis dorés style victoire
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
      await addGame(formData)
      triggerConfetti()
      
      // Reset form
      setFormData({
        winnerId: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        place: '',
        gameType: 'belote',
        mood: 'epic',
        participants: [],
        badges: [],
        comment: '',
      })
      
      onSuccess?.()
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

  const toggleBadge = (badge) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter(b => b !== badge)
        : [...prev.badges, badge]
    }))
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={<><Target className="w-6 h-6" /> Nouvelle Victoire</>}
    >
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Vainqueur */}
            <div className="md:col-span-2 space-y-2">
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
            <div className="md:col-span-2 space-y-2">
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
            <div className="md:col-span-2 space-y-3">
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
            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <MessageSquare className="w-4 h-4" /> Commentaire épique
              </label>
              <textarea 
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                rows={3}
                placeholder="Racontez cette victoire légendaire..."
                className="form-input resize-none"
              />
            </div>

            {/* Badges */}
            <div className="md:col-span-2 space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                <Sparkles className="w-4 h-4" /> Badges spéciaux
              </label>
              <div className="flex flex-wrap gap-2">
                {BADGES.map(badge => (
                  <motion.label 
                    key={badge.value}
                    className={`badge-option ${formData.badges.includes(badge.value) ? 'selected' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input 
                      type="checkbox"
                      checked={formData.badges.includes(badge.value)}
                      onChange={() => toggleBadge(badge.value)}
                      className="hidden"
                    />
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-sm font-medium">{badge.name}</span>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" type="button" onClick={onClose}>
            <X className="w-4 h-4" /> Annuler
          </Button>
          <Button type="submit">
            <Trophy className="w-5 h-5" /> Enregistrer la victoire
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
