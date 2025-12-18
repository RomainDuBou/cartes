import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, ChevronRight } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { getPlayerTitle, calculatePlayerStats } from '../../utils/helpers'
import { Card, CardHeader, CardBody, Button } from '../ui'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 100 }
  }
}

export function PlayerList({ onCreatePlayer }) {
  const { players, games } = useGame()

  return (
    <div>
      {/* Créer un nouveau joueur */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="glass-gold rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gold/10">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-gold">
              <UserPlus className="w-5 h-5" /> Nouveau Joueur
            </h3>
          </div>
          <div className="p-6">
            <form onSubmit={onCreatePlayer} className="flex gap-4">
              <input 
                type="text" 
                name="playerName"
                placeholder="Nom du joueur..." 
                className="form-input flex-1"
                required
              />
              <Button type="submit">
                <UserPlus className="w-5 h-5" />
                <span>Créer</span>
              </Button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Liste des joueurs */}
      {players.length > 0 ? (
        <motion.div 
          className="grid gap-4 md:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {players.map(player => {
            const stats = calculatePlayerStats(player.id, games)
            return (
              <motion.div key={player.id} variants={item}>
                <Link to={`/players/${player.id}`}>
                  <motion.div 
                    className="flex items-center gap-4 p-5 rounded-2xl glass group"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                  >
                    <motion.div 
                      className="avatar-3d w-16 h-16 text-3xl"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      {player.emoji || '🃏'}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white group-hover:text-gold transition-colors">
                        {player.name}
                      </h3>
                      <p className="text-sm text-white/40">
                        {getPlayerTitle(stats.wins)}
                      </p>
                    </div>
                    <div className="text-center mr-2">
                      <div className="font-display text-2xl font-bold bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                        {stats.wins}
                      </div>
                      <div className="text-xs text-white/30">victoires</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div 
            className="text-7xl mb-4 opacity-30"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            👥
          </motion.div>
          <p className="text-white/40">Aucun joueur créé</p>
        </motion.div>
      )}
    </div>
  )
}
