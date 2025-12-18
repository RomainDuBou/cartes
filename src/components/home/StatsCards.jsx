import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Trophy, Crown, Flame, MapPin } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { calculateCurrentStreak } from '../../utils/helpers'

// Carte 3D interactive
function Card3D({ stat, index }) {
  const cardRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)
  
  // Motion values pour le mouvement de la souris
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Springs pour des mouvements fluides
  const springConfig = { stiffness: 150, damping: 15 }
  const rotateX = useSpring(useTransform(y, [-100, 100], [25, -25]), springConfig)
  const rotateY = useSpring(useTransform(x, [-100, 100], [-25, 25]), springConfig)
  
  // Position du reflet
  const sheenX = useTransform(x, [-100, 100], [0, 100])
  const sheenY = useTransform(y, [-100, 100], [0, 100])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  const suits = ['♠', '♥', '♦', '♣']
  const suit = suits[index % 4]
  const suitColor = index % 4 === 1 || index % 4 === 2 ? '#ef4444' : '#ffffff'

  return (
    <motion.div
      className="relative perspective-1000 cursor-pointer"
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
    >
      <motion.div
        ref={cardRef}
        className="relative w-full aspect-[3/4] preserve-3d"
        style={{ 
          rotateX: isFlipped ? 0 : rotateX, 
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Face avant de la carte */}
        <motion.div 
          className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${stat.bgFrom}, ${stat.bgTo})`,
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
          }}
        >
          {/* Motif de carte */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.03) 10px,
                  rgba(255,255,255,0.03) 20px
                )`
              }}
            />
          </div>

          {/* Coins avec symbole */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col items-center">
            <span className="text-xs sm:text-sm font-bold text-white/80">{index + 1}</span>
            <span className="text-sm sm:text-lg -mt-0.5" style={{ color: suitColor, opacity: 0.8 }}>{suit}</span>
          </div>
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex flex-col items-center rotate-180">
            <span className="text-xs sm:text-sm font-bold text-white/80">{index + 1}</span>
            <span className="text-sm sm:text-lg -mt-0.5" style={{ color: suitColor, opacity: 0.8 }}>{suit}</span>
          </div>

          {/* Contenu central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4">
            {/* Icône principale */}
            <motion.div 
              className="relative mb-2 sm:mb-3"
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear",
                delay: index * 0.5 
              }}
            >
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${stat.iconFrom}, ${stat.iconTo})`,
                  boxShadow: `0 8px 32px ${stat.iconShadow}`,
                }}
              >
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-lg" />
              </div>
              {/* Glow animé */}
              <motion.div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${stat.iconFrom}, ${stat.iconTo})` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            </motion.div>

            {/* Valeur */}
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-black text-white text-center truncate max-w-full px-2 drop-shadow-lg"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              {stat.value}
            </motion.div>
            
            {/* Label */}
            <div className="text-[10px] sm:text-xs md:text-sm text-white/70 font-semibold uppercase tracking-wider mt-0.5 sm:mt-1">
              {stat.label}
            </div>
          </div>

          {/* Effet de reflet/sheen */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                135deg, 
                transparent 40%, 
                rgba(255,255,255,0.1) 45%, 
                rgba(255,255,255,0.2) 50%, 
                rgba(255,255,255,0.1) 55%, 
                transparent 60%
              )`,
              backgroundSize: '200% 200%',
              backgroundPosition: useTransform(
                [sheenX, sheenY],
                ([x, y]) => `${x}% ${y}%`
              ),
            }}
          />

          {/* Bordure brillante */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/20" />
        </motion.div>

        {/* Face arrière de la carte */}
        <motion.div 
          className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          {/* Pattern au dos */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(212,175,55,0.1) 0px, rgba(212,175,55,0.1) 1px, transparent 1px, transparent 10px),
              repeating-linear-gradient(-45deg, rgba(212,175,55,0.1) 0px, rgba(212,175,55,0.1) 1px, transparent 1px, transparent 10px)
            `,
          }} />
          
          {/* Logo central au dos */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="text-5xl sm:text-6xl md:text-7xl opacity-30">🃏</div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-gold/30 rounded-full" />
              </motion.div>
            </div>
          </div>

          {/* Bordure dorée */}
          <div className="absolute inset-2 sm:inset-3 rounded-lg sm:rounded-xl border-2 border-gold/20" />
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-gold/10" />
        </motion.div>
      </motion.div>

      {/* Ombre portée */}
      <motion.div 
        className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 sm:h-6 rounded-full blur-xl"
        style={{ 
          background: stat.shadowColor,
          opacity: 0.4,
        }}
        animate={{ 
          scaleX: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Indicateur "Cliquez" */}
      <motion.div 
        className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] text-white/30 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 + index * 0.5 }}
      >
        Cliquez pour retourner
      </motion.div>
    </motion.div>
  )
}

export function StatsCards() {
  const { players, games } = useGame()

  // Calcul des stats
  const totalGames = games.length

  // Top player
  const playerWins = {}
  games.forEach(g => {
    playerWins[g.winnerId] = (playerWins[g.winnerId] || 0) + 1
  })
  const topPlayerId = Object.keys(playerWins).sort((a, b) => playerWins[b] - playerWins[a])[0]
  const topPlayer = players.find(p => p.id === topPlayerId)

  // Current streak
  const { streak: currentStreak } = calculateCurrentStreak(games)

  // Favorite place
  const placeCounts = {}
  games.forEach(g => {
    if (g.place) {
      placeCounts[g.place] = (placeCounts[g.place] || 0) + 1
    }
  })
  const favoritePlace = Object.keys(placeCounts).sort((a, b) => placeCounts[b] - placeCounts[a])[0]

  const stats = [
    {
      icon: Trophy,
      value: totalGames,
      label: 'Parties',
      bgFrom: '#1a1a2e',
      bgTo: '#2d1f47',
      iconFrom: '#f59e0b',
      iconTo: '#d97706',
      iconShadow: 'rgba(245, 158, 11, 0.4)',
      shadowColor: 'rgba(245, 158, 11, 0.5)',
    },
    {
      icon: Crown,
      value: topPlayer?.name || '-',
      label: 'Champion',
      bgFrom: '#1a1a2e',
      bgTo: '#2d2d1f',
      iconFrom: '#eab308',
      iconTo: '#ca8a04',
      iconShadow: 'rgba(234, 179, 8, 0.4)',
      shadowColor: 'rgba(234, 179, 8, 0.5)',
    },
    {
      icon: Flame,
      value: currentStreak,
      label: 'Série',
      bgFrom: '#1a1a2e',
      bgTo: '#3d1f1f',
      iconFrom: '#f97316',
      iconTo: '#dc2626',
      iconShadow: 'rgba(249, 115, 22, 0.4)',
      shadowColor: 'rgba(249, 115, 22, 0.5)',
    },
    {
      icon: MapPin,
      value: favoritePlace || '-',
      label: 'Lieu favori',
      bgFrom: '#1a1a2e',
      bgTo: '#1f3d2d',
      iconFrom: '#10b981',
      iconTo: '#059669',
      iconShadow: 'rgba(16, 185, 129, 0.4)',
      shadowColor: 'rgba(16, 185, 129, 0.5)',
    },
  ]

  return (
    <section className="mb-8 sm:mb-10 md:mb-12">
      {/* Titre de section */}
      <motion.div 
        className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-gold to-amber-600 rounded-full" />
        <h2 className="text-base sm:text-lg font-semibold text-white/80">Statistiques Rapides</h2>
      </motion.div>

      {/* Grille de cartes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <Card3D key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  )
}
