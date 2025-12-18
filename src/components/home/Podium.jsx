import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useGame } from '../../context/GameContext'

export function Podium() {
  const { players, games } = useGame()

  // Calculer les victoires par joueur
  const playerWins = {}
  games.forEach(g => {
    playerWins[g.winnerId] = (playerWins[g.winnerId] || 0) + 1
  })

  // Trier par victoires
  const sortedPlayers = players
    .map(p => ({ ...p, wins: playerWins[p.id] || 0 }))
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 3)

  const podiumConfig = [
    { 
      position: 2, 
      medal: '🥈', 
      height: 80,
      heightMd: 120,
      gradient: 'podium-second',
      delay: 0.4,
      y: 30,
      yMd: 40 
    },
    { 
      position: 1, 
      medal: '🥇', 
      height: 110,
      heightMd: 160,
      gradient: 'podium-first',
      delay: 0.2,
      y: 0,
      yMd: 0,
      crown: true 
    },
    { 
      position: 3, 
      medal: '🥉', 
      height: 60,
      heightMd: 80,
      gradient: 'podium-third',
      delay: 0.6,
      y: 50,
      yMd: 80 
    },
  ]

  // Réorganiser: 2nd, 1st, 3rd
  const displayOrder = [1, 0, 2]

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 py-6 md:py-10 perspective-1000 px-2">
      {displayOrder.map((orderIndex, i) => {
        const config = podiumConfig[orderIndex]
        const player = sortedPlayers[config.position - 1]
        
        return (
          <motion.div 
            key={config.position}
            className="flex flex-col items-center flex-1 max-w-[140px] md:max-w-none"
            initial={{ opacity: 0, y: 100, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              delay: config.delay,
              duration: 0.8,
              type: "spring",
              stiffness: 80
            }}
            style={{ marginTop: config.y }}
          >
            {/* Crown for 1st place */}
            {config.crown && (
              <motion.div 
                className="text-3xl md:text-5xl crown-float mb-1 md:mb-2"
                initial={{ y: -50, opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                👑
              </motion.div>
            )}
            
            {/* Avatar */}
            {player ? (
              <Link to={`/players/${player.id}`}>
                <motion.div 
                  className="avatar-3d w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-2xl sm:text-3xl md:text-4xl mb-2 md:mb-3 cursor-pointer"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {player.emoji || config.medal}
                </motion.div>
              </Link>
            ) : (
              <motion.div 
                className="avatar-3d w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-2xl sm:text-3xl md:text-4xl mb-2 md:mb-3 opacity-30"
              >
                {config.medal}
              </motion.div>
            )}
            
            {/* Name - Cliquable */}
            {player ? (
              <Link to={`/players/${player.id}`} className="group">
                <motion.div 
                  className="font-display text-sm sm:text-base md:text-xl font-bold text-white mb-0.5 md:mb-1 text-center group-hover:text-gold transition-colors line-clamp-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: config.delay + 0.3 }}
                >
                  {player.name}
                </motion.div>
              </Link>
            ) : (
              <motion.div 
                className="font-display text-sm sm:text-base md:text-xl font-bold text-white/30 mb-0.5 md:mb-1 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: config.delay + 0.3 }}
              >
                -
              </motion.div>
            )}
            
            {/* Wins */}
            <motion.div 
              className="text-xs sm:text-sm text-gold/80 mb-1 md:mb-2 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: config.delay + 0.4 }}
            >
              {player?.wins || 0} victoire{(player?.wins || 0) !== 1 ? 's' : ''}
            </motion.div>

            {/* Voir profil - Hidden on small mobile */}
            {player && (
              <Link to={`/players/${player.id}`} className="hidden sm:block">
                <motion.div 
                  className="flex items-center gap-1 text-xs text-white/40 hover:text-gold transition-colors mb-2 md:mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: config.delay + 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Eye className="w-3 h-3" />
                  <span>Profil</span>
                </motion.div>
              </Link>
            )}
            
            {/* Stand */}
            <motion.div 
              className={`podium-stand ${config.gradient} w-full sm:w-24 md:w-32 lg:w-40 text-2xl sm:text-3xl md:text-4xl`}
              style={{ height: config.height }}
              initial={{ height: 0 }}
              animate={{ height: config.height }}
              transition={{ 
                delay: config.delay + 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <span className="relative z-10">{config.position}</span>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
