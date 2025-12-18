import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Filter, Calendar, MapPin, Edit3, Eye } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { formatDate, getMoodEmoji, getMoodText, getBadgeInfo } from '../../utils/helpers'
import { GAME_TYPE_COLORS } from '../../utils/constants'
import { ConfirmModal } from '../ui'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.2 } 
  }
}

export function GamesHistory({ onEditGame }) {
  const { players, games, getPlayer, deleteGame } = useGame()
  const [filterPlayer, setFilterPlayer] = useState('')
  const [filterPlace, setFilterPlace] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, gameId: null, gameName: '' })

  // Filtrer les parties
  let filteredGames = [...games]
  
  if (filterPlayer) {
    filteredGames = filteredGames.filter(g => g.winnerId === filterPlayer)
  }
  
  if (filterPlace) {
    filteredGames = filteredGames.filter(g => g.place === filterPlace)
  }

  // Trier par date décroissante
  filteredGames.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Liste des lieux uniques
  const places = [...new Set(games.map(g => g.place).filter(Boolean))]

  const handleDeleteClick = (game) => {
    const winner = getPlayer(game.winnerId)
    setDeleteConfirm({
      open: true,
      gameId: game.id,
      gameName: `${winner?.name || 'Inconnu'} - ${formatDate(game.date)}`
    })
  }

  const handleConfirmDelete = async () => {
    if (deleteConfirm.gameId) {
      try {
        await deleteGame(deleteConfirm.gameId)
      } catch (error) {
        console.error('Erreur suppression:', error)
      }
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header avec filtres */}
      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white flex items-center gap-2 md:gap-3">
          <motion.span 
            className="text-red-500 text-3xl md:text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ♥
          </motion.span> 
          Historique
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60 pointer-events-none z-10" />
            <select 
              value={filterPlayer}
              onChange={(e) => setFilterPlayer(e.target.value)}
              className="form-input py-2.5 text-sm w-full sm:min-w-[180px] text-white"
              style={{ paddingLeft: '2.5rem' }}
            >
              <option value="">Tous les joueurs</option>
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
              ))}
            </select>
          </div>
          <div className="relative flex-1 sm:flex-none">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60 pointer-events-none z-10" />
            <select 
              value={filterPlace}
              onChange={(e) => setFilterPlace(e.target.value)}
              className="form-input py-2.5 text-sm w-full sm:min-w-[180px] text-white"
              style={{ paddingLeft: '2.5rem' }}
            >
              <option value="">Tous les lieux</option>
              {places.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grille des parties */}
      <AnimatePresence mode="popLayout">
        {filteredGames.length > 0 ? (
          <motion.div 
            className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredGames.map((game) => {
              const winner = getPlayer(game.winnerId)
              const typeColor = GAME_TYPE_COLORS[game.gameType] || GAME_TYPE_COLORS.autre
              
              return (
                <motion.div 
                  key={game.id}
                  className="game-card group"
                  variants={item}
                  layout
                  whileHover={{ y: -5 }}
                >
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                    <motion.span 
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${typeColor}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {game.gameType}
                    </motion.span>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(game.date)}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {/* Winner */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {winner ? (
                          <Link to={`/players/${winner.id}`}>
                            <motion.div 
                              className="avatar-3d w-14 h-14 text-3xl winner-badge cursor-pointer"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              {winner.emoji || '👤'}
                            </motion.div>
                          </Link>
                        ) : (
                          <div className="avatar-3d w-14 h-14 text-3xl opacity-50">👤</div>
                        )}
                        <div>
                          {winner ? (
                            <Link to={`/players/${winner.id}`} className="group">
                              <h4 className="font-display text-xl font-bold bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:to-yellow-100 transition-all">
                                {winner.name}
                              </h4>
                            </Link>
                          ) : (
                            <h4 className="font-display text-xl font-bold text-white/50">
                              Joueur inconnu
                            </h4>
                          )}
                          <p className="text-sm text-white/40 flex items-center gap-1">
                            <span>{getMoodEmoji(game.mood)}</span>
                            <span>{getMoodText(game.mood)}</span>
                          </p>
                        </div>
                      </div>
                      {winner && (
                        <Link to={`/players/${winner.id}`}>
                          <motion.div 
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-white/40 hover:text-gold hover:bg-gold/10 transition-all"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Eye className="w-3 h-3" />
                            <span>Profil</span>
                          </motion.div>
                        </Link>
                      )}
                    </div>

                    {/* Meta */}
                    {game.place && (
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <MapPin className="w-4 h-4" />
                        <span>{game.place}</span>
                      </div>
                    )}

                    {/* Badges */}
                    {game.badges?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {game.badges.map(badge => {
                          const info = getBadgeInfo(badge)
                          return (
                            <motion.span 
                              key={badge}
                              className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-white/60 border border-white/5"
                              title={info.name}
                              whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                            >
                              {info.icon} {info.name}
                            </motion.span>
                          )
                        })}
                      </div>
                    )}

                    {/* Comment */}
                    {game.comment && (
                      <div className="mt-4 p-3 rounded-xl bg-white/[0.02] text-sm text-white/50 italic border-l-2 border-gold/30">
                        "{game.comment}"
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-4 sm:px-5 py-3 sm:py-4 bg-white/[0.03] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 relative z-10">
                    {/* Participants */}
                    <div className="flex -space-x-2">
                      {game.participants?.slice(0, 4).map(pId => {
                        const p = getPlayer(pId)
                        return (
                          <div 
                            key={pId}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border-2 border-card-black flex items-center justify-center text-xs sm:text-sm"
                            title={p?.name || 'Inconnu'}
                          >
                            {p?.emoji || '👤'}
                          </div>
                        )
                      })}
                      {game.participants?.length > 4 && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold/20 border-2 border-card-black flex items-center justify-center text-xs font-bold text-gold">
                          +{game.participants.length - 4}
                        </div>
                      )}
                      {(!game.participants || game.participants.length === 0) && (
                        <span className="text-xs text-white/30">Aucun participant</span>
                      )}
                    </div>

                    {/* Actions - Boutons responsives */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button 
                        type="button"
                        onClick={() => onEditGame?.(game)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 hover:border-gold/50 transition-all duration-200 text-xs sm:text-sm font-medium"
                      >
                        <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Modifier</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDeleteClick(game)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 text-xs sm:text-sm font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div 
              className="text-8xl mb-6 opacity-30"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🃏
            </motion.div>
            <h3 className="font-display text-2xl text-white/50 mb-2">
              Aucune partie enregistrée
            </h3>
            <p className="text-white/30">
              Commencez à jouer et enregistrez votre première victoire !
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de confirmation */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, gameId: null, gameName: '' })}
        onConfirm={handleConfirmDelete}
        title="Supprimer cette partie ?"
        message={`Êtes-vous sûr de vouloir supprimer la partie "${deleteConfirm.gameName}" ? Cette action est irréversible.`}
        confirmText="Oui, supprimer"
        cancelText="Non, annuler"
        variant="danger"
      />
    </motion.section>
  )
}
