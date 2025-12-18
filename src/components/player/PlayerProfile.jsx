import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit3, Trophy, Medal, User, Smile, FileText, Save, Trash2, Star, Award, ExternalLink } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { getPlayerTitle, calculatePlayerStats, calculateMaxStreak, formatDate, getBadgeInfo } from '../../utils/helpers'
import { AVATAR_EMOJIS, BADGES, BADGE_CATEGORIES, BADGE_CATEGORY_COLORS } from '../../utils/constants'
import { Button, ConfirmModal } from '../ui'

// Fonction pour calculer les accomplissements
function getAchievements(stats, maxStreak, playerBadges, playerGames) {
  // Compter les jeux différents gagnés
  const uniqueGameTypes = [...new Set(playerGames.map(g => g.gameType))]
  
  // Compter les lieux différents
  const uniquePlaces = [...new Set(playerGames.map(g => g.place).filter(Boolean))]
  
  // Vérifier si a gagné tard le soir (badge night-owl)
  const hasNightOwl = playerGames.some(g => g.badges?.includes('night-owl'))
  
  // Vérifier si a gagné tôt le matin
  const hasEarlyBird = playerGames.some(g => g.badges?.includes('early-bird'))
  
  // Badges stratégiques
  const strategyBadges = ['mastermind', 'bluffer', 'trap', 'calculator', 'reader']
  const strategyCount = playerGames.filter(g => 
    g.badges?.some(b => strategyBadges.includes(b))
  ).length
  
  // Badges chanceux
  const luckyBadges = ['lucky-draw', 'miracle', 'against-odds']
  const luckyCount = playerGames.filter(g => 
    g.badges?.some(b => luckyBadges.includes(b))
  ).length

  return [
    // === DÉBUTS ===
    { icon: '🎮', name: 'Bienvenue', desc: 'Rejoindre l\'aventure', earned: true, category: 'debut' },
    { icon: '🏆', name: 'Première Victoire', desc: 'Remporter sa première partie', earned: stats.wins >= 1, category: 'debut' },
    { icon: '🎲', name: 'Habitué', desc: 'Jouer 5 parties', earned: stats.gamesPlayed >= 5, category: 'debut' },
    
    // === VICTOIRES ===
    { icon: '⭐', name: 'Étoile Montante', desc: '5 victoires totales', earned: stats.wins >= 5, category: 'victoires' },
    { icon: '👑', name: 'Roi des Cartes', desc: '10 victoires totales', earned: stats.wins >= 10, category: 'victoires' },
    { icon: '🌟', name: 'Champion', desc: '25 victoires totales', earned: stats.wins >= 25, category: 'victoires' },
    { icon: '💫', name: 'Légende', desc: '50 victoires totales', earned: stats.wins >= 50, category: 'victoires' },
    { icon: '🏛️', name: 'Immortel', desc: '100 victoires totales', earned: stats.wins >= 100, category: 'victoires' },
    
    // === SÉRIES ===
    { icon: '🔥', name: 'En Feu', desc: '3 victoires d\'affilée', earned: maxStreak >= 3, category: 'series' },
    { icon: '💪', name: 'Inarrêtable', desc: '5 victoires d\'affilée', earned: maxStreak >= 5, category: 'series' },
    { icon: '⚡', name: 'Électrique', desc: '7 victoires d\'affilée', earned: maxStreak >= 7, category: 'series' },
    { icon: '🌪️', name: 'Ouragan', desc: '10 victoires d\'affilée', earned: maxStreak >= 10, category: 'series' },
    
    // === RÉGULARITÉ ===
    { icon: '🎯', name: 'Régulier', desc: '20 parties jouées', earned: stats.gamesPlayed >= 20, category: 'regularite' },
    { icon: '📅', name: 'Fidèle', desc: '50 parties jouées', earned: stats.gamesPlayed >= 50, category: 'regularite' },
    { icon: '🏅', name: 'Vétéran', desc: '100 parties jouées', earned: stats.gamesPlayed >= 100, category: 'regularite' },
    
    // === TAUX DE VICTOIRE ===
    { icon: '📈', name: 'Bon Ratio', desc: 'Taux de victoire > 40%', earned: stats.winRate >= 40 && stats.gamesPlayed >= 5, category: 'taux' },
    { icon: '📊', name: 'Performant', desc: 'Taux de victoire > 60%', earned: stats.winRate >= 60 && stats.gamesPlayed >= 10, category: 'taux' },
    { icon: '💯', name: 'Perfectionniste', desc: 'Taux de victoire > 75%', earned: stats.winRate >= 75 && stats.gamesPlayed >= 10, category: 'taux' },
    { icon: '🎖️', name: 'Élite', desc: 'Taux de victoire > 90%', earned: stats.winRate >= 90 && stats.gamesPlayed >= 10, category: 'taux' },
    
    // === DIVERSITÉ ===
    { icon: '🃏', name: 'Polyvalent', desc: 'Gagner à 3 jeux différents', earned: uniqueGameTypes.length >= 3, category: 'diversite' },
    { icon: '🎪', name: 'Maître Multi-Jeux', desc: 'Gagner à 5 jeux différents', earned: uniqueGameTypes.length >= 5, category: 'diversite' },
    { icon: '🗺️', name: 'Voyageur', desc: 'Gagner dans 3 lieux différents', earned: uniquePlaces.length >= 3, category: 'diversite' },
    { icon: '🌍', name: 'Globe-Trotter', desc: 'Gagner dans 5 lieux différents', earned: uniquePlaces.length >= 5, category: 'diversite' },
    
    // === COLLECTION DE BADGES ===
    { icon: '🏷️', name: 'Collectionneur', desc: 'Obtenir 5 badges différents', earned: playerBadges.length >= 5, category: 'badges' },
    { icon: '📚', name: 'Archiviste', desc: 'Obtenir 10 badges différents', earned: playerBadges.length >= 10, category: 'badges' },
    { icon: '🗃️', name: 'Conservateur', desc: 'Obtenir 20 badges différents', earned: playerBadges.length >= 20, category: 'badges' },
    { icon: '🏆', name: 'Maître Collectionneur', desc: 'Obtenir 30 badges différents', earned: playerBadges.length >= 30, category: 'badges' },
    
    // === SPÉCIAUX ===
    { icon: '🦉', name: 'Oiseau de Nuit', desc: 'Gagner après minuit', earned: hasNightOwl, category: 'special' },
    { icon: '🌅', name: 'Lève-Tôt', desc: 'Gagner tôt le matin', earned: hasEarlyBird, category: 'special' },
    { icon: '🧠', name: 'Stratège', desc: '5 victoires avec badges stratégie', earned: strategyCount >= 5, category: 'special' },
    { icon: '🍀', name: 'Chanceux', desc: '3 victoires avec badges chance', earned: luckyCount >= 3, category: 'special' },
    
    // === DOMINATION ===
    { icon: '💎', name: 'Sans Défaut', desc: '10 victoires avec badge "Sans Faute"', earned: playerGames.filter(g => g.badges?.includes('flawless')).length >= 10, category: 'domination' },
    { icon: '👊', name: 'Dominateur', desc: '10 victoires avec badge "Domination"', earned: playerGames.filter(g => g.badges?.includes('domination')).length >= 10, category: 'domination' },
    { icon: '🦈', name: 'Prédateur', desc: '5 victoires avec badge "Requin"', earned: playerGames.filter(g => g.badges?.includes('aggressive')).length >= 5, category: 'domination' },
  ]
}

export function PlayerProfile({ player, onUpdate, onDelete }) {
  const { games } = useGame()
  const [editData, setEditData] = useState({
    name: player.name,
    emoji: player.emoji || '🃏',
    description: player.description || '',
  })
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const stats = calculatePlayerStats(player.id, games)
  const { maxStreak } = calculateMaxStreak(player.id, games)
  
  // Victoires du joueur
  const playerGames = games
    .filter(g => g.winnerId === player.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  // Collecter tous les badges uniques du joueur
  const playerBadges = [...new Set(
    playerGames.flatMap(g => g.badges || [])
  )]

  // Grouper les badges par catégorie
  const badgesByCategory = BADGE_CATEGORIES.map(cat => ({
    ...cat,
    badges: playerBadges
      .map(b => BADGES.find(badge => badge.value === b))
      .filter(b => b && b.category === cat.value)
  })).filter(cat => cat.badges.length > 0)

  // Compter combien de fois chaque badge a été obtenu
  const badgeCounts = playerGames.reduce((acc, game) => {
    (game.badges || []).forEach(b => {
      acc[b] = (acc[b] || 0) + 1
    })
    return acc
  }, {})

  const handleSave = (e) => {
    e.preventDefault()
    onUpdate(editData)
  }

  const handleDelete = () => {
    setDeleteConfirm(true)
  }

  const confirmDelete = () => {
    onDelete()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header du profil */}
      <motion.div 
        className="relative py-12 text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <Link to="/players" className="absolute top-0 left-0">
          <motion.div 
            className="nav-link"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </motion.div>
        </Link>

        {/* Avatar */}
        <motion.div 
          className="relative inline-block"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <div className="avatar-3d w-32 h-32 text-6xl glow-gold-intense">
            {player.emoji || '🃏'}
          </div>
          {/* Floating stars */}
          {stats.wins >= 5 && (
            <motion.div 
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-gold fill-gold" />
            </motion.div>
          )}
        </motion.div>

        {/* Nom */}
        <motion.h2 
          className="font-display text-4xl font-bold bg-gradient-to-r from-white via-gold-light to-white bg-clip-text text-transparent mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {player.name}
        </motion.h2>
        <motion.p 
          className="text-gold/60 mt-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {getPlayerTitle(stats.wins)}
        </motion.p>

        {/* Description */}
        {player.description && (
          <motion.p 
            className="text-white/50 mt-4 max-w-md mx-auto italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            "{player.description}"
          </motion.p>
        )}

        {/* Stats */}
        <motion.div 
          className="flex justify-center gap-10 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { value: stats.wins, label: 'Victoires', color: 'from-gold to-amber-300' },
            { value: stats.gamesPlayed, label: 'Parties', color: 'from-blue-400 to-cyan-300' },
            { value: `${stats.winRate}%`, label: 'Taux', color: 'from-emerald-400 to-teal-300' },
            { value: maxStreak, label: 'Série Max', color: 'from-orange-400 to-red-300' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className={`font-display text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Collection de badges du joueur */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-semibold text-white">Collection de Badges</h3>
              <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-sm font-medium">
                {playerBadges.length} badges
              </span>
            </div>
            <Link to="/badges" className="text-sm text-white/40 hover:text-gold transition-colors flex items-center gap-1">
              Voir tous les badges <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-6">
            {badgesByCategory.length > 0 ? (
              <div className="space-y-6">
                {badgesByCategory.map(category => (
                  <div key={category.value}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-sm bg-gradient-to-r ${BADGE_CATEGORY_COLORS[category.value]} border`}>
                        {category.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {category.badges.map((badge, i) => (
                        <motion.div 
                          key={badge.value}
                          className="group relative flex items-center gap-3 px-4 py-3 rounded-xl glass-gold cursor-help"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-2xl">{badge.icon}</span>
                          <div>
                            <div className="font-semibold text-white text-sm">{badge.name}</div>
                            <div className="text-xs text-gold/60">
                              Obtenu {badgeCounts[badge.value]}x
                            </div>
                          </div>
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 rounded-lg text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 text-center z-10">
                            {badge.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-white/30">
                <div className="text-5xl mb-3 opacity-30">🏅</div>
                <p>Aucun badge obtenu pour le moment</p>
                <p className="text-sm mt-1">Gagnez des parties pour collecter des badges !</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Éditer le profil */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <Edit3 className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-semibold text-white">Modifier le profil</h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleSave} className="space-y-5">
                {/* Nom */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                    <User className="w-4 h-4" /> Nom
                  </label>
                  <input 
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                    required
                  />
                </div>

                {/* Avatar */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                    <Smile className="w-4 h-4" /> Avatar
                  </label>
                  <div className="grid grid-cols-8 gap-2 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    {AVATAR_EMOJIS.map(emoji => (
                      <motion.button
                        key={emoji}
                        type="button"
                        onClick={() => setEditData(prev => ({ ...prev, emoji }))}
                        className={`
                          w-10 h-10 rounded-lg flex items-center justify-center text-xl
                          transition-all
                          ${editData.emoji === emoji 
                            ? 'bg-gold/20 ring-2 ring-gold shadow-lg shadow-gold/20' 
                            : 'hover:bg-white/5'
                          }
                        `}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/60">
                    <FileText className="w-4 h-4" /> Description
                  </label>
                  <textarea 
                    value={editData.description}
                    onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    placeholder="Une petite bio ou devise..."
                    className="form-input resize-none"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Save className="w-5 h-5" /> Enregistrer
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/5">
                <motion.button 
                  onClick={handleDelete}
                  className="w-full py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all text-sm flex items-center justify-center gap-2 border border-transparent hover:border-red-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-4 h-4" /> Supprimer ce joueur
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Historique des victoires */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass rounded-2xl overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <Trophy className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-semibold text-white">Mes Victoires</h3>
              <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-sm font-medium">
                {playerGames.length}
              </span>
            </div>
            <div className="p-6">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {playerGames.length > 0 ? (
                  playerGames.map((game, i) => (
                    <motion.div 
                      key={game.id}
                      className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-gold/20 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className="text-2xl">🏆</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white capitalize">{game.gameType}</div>
                        <div className="text-sm text-white/40">
                          {formatDate(game.date)}
                          {game.place && ` • ${game.place}`}
                        </div>
                      </div>
                      {game.badges?.length > 0 && (
                        <div className="flex gap-1 flex-shrink-0">
                          {game.badges.slice(0, 3).map(b => (
                            <span key={b} title={getBadgeInfo(b).name} className="text-lg">{getBadgeInfo(b).icon}</span>
                          ))}
                          {game.badges.length > 3 && (
                            <span className="text-xs text-white/40">+{game.badges.length - 3}</span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-10 text-white/30">
                    <div className="text-4xl mb-2 opacity-50">🎯</div>
                    Aucune victoire pour le moment...
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Accomplissements automatiques */}
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Medal className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-semibold text-white">Accomplissements</h3>
            </div>
            <span className="text-sm text-white/40">
              {(() => {
                const achievements = getAchievements(stats, maxStreak, playerBadges, playerGames)
                const earned = achievements.filter(a => a.earned).length
                return `${earned}/${achievements.length} débloqués`
              })()}
            </span>
          </div>
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-[400px] overflow-y-auto pr-2">
              {getAchievements(stats, maxStreak, playerBadges, playerGames).map((achievement, i) => (
                <motion.div 
                  key={achievement.name}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
                    ${achievement.earned 
                      ? 'glass-gold' 
                      : 'bg-white/[0.02] border-white/5 opacity-40 grayscale'
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: achievement.earned ? 1 : 0.4, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.02 }}
                  whileHover={achievement.earned ? { scale: 1.02 } : {}}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{achievement.name}</div>
                    <div className="text-xs text-white/40 truncate">{achievement.desc}</div>
                  </div>
                  {achievement.earned && (
                    <span className="text-gold text-lg">✓</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal de confirmation suppression */}
      <ConfirmModal
        isOpen={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Supprimer ce joueur ?"
        message={`Êtes-vous sûr de vouloir supprimer "${player.name}" ? Toutes ses statistiques seront perdues. Cette action est irréversible.`}
        confirmText="Oui, supprimer"
        cancelText="Non, annuler"
        variant="danger"
      />
    </motion.div>
  )
}
