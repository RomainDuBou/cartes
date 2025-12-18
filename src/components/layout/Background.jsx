import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Cartes de jeu stylisées
const CARDS = [
  { suit: '♠', value: 'A', color: 'white' },
  { suit: '♥', value: 'K', color: '#ef4444' },
  { suit: '♦', value: 'Q', color: '#ef4444' },
  { suit: '♣', value: 'J', color: 'white' },
  { suit: '♠', value: '10', color: 'white' },
  { suit: '♥', value: 'A', color: '#ef4444' },
  { suit: '♦', value: 'K', color: '#ef4444' },
  { suit: '♣', value: 'Q', color: 'white' },
]

function FloatingCard({ card, index, total }) {
  const randomX = 5 + (index / total) * 90
  const randomDelay = index * 2
  const randomDuration = 20 + Math.random() * 15
  const randomRotation = -30 + Math.random() * 60
  const randomScale = 0.5 + Math.random() * 0.4

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${randomX}%`,
        top: '-150px',
      }}
      animate={{
        y: ['0vh', '120vh'],
        rotate: [randomRotation, randomRotation + 360],
        x: [0, Math.sin(index) * 100, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div 
        className="relative w-16 h-24 rounded-lg bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.1] shadow-xl"
        style={{ 
          transform: `scale(${randomScale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Coin supérieur gauche */}
        <div className="absolute top-1.5 left-1.5 flex flex-col items-center">
          <span className="text-xs font-bold" style={{ color: card.color, opacity: 0.6 }}>
            {card.value}
          </span>
          <span className="text-sm -mt-1" style={{ color: card.color, opacity: 0.6 }}>
            {card.suit}
          </span>
        </div>
        
        {/* Centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl" style={{ color: card.color, opacity: 0.4 }}>
            {card.suit}
          </span>
        </div>
        
        {/* Coin inférieur droit (inversé) */}
        <div className="absolute bottom-1.5 right-1.5 flex flex-col items-center rotate-180">
          <span className="text-xs font-bold" style={{ color: card.color, opacity: 0.6 }}>
            {card.value}
          </span>
          <span className="text-sm -mt-1" style={{ color: card.color, opacity: 0.6 }}>
            {card.suit}
          </span>
        </div>

        {/* Reflet */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </motion.div>
  )
}

function FloatingChip({ index }) {
  const colors = ['#D4AF37', '#ef4444', '#22c55e', '#3b82f6', '#8b5cf6']
  const color = colors[index % colors.length]
  const randomX = 10 + Math.random() * 80
  const randomDelay = 5 + index * 3
  const randomDuration = 25 + Math.random() * 10

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${randomX}%`, top: '-80px' }}
      animate={{
        y: ['0vh', '120vh'],
        rotate: [0, 720],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div 
        className="w-10 h-10 rounded-full border-4 flex items-center justify-center"
        style={{ 
          borderColor: color,
          background: `radial-gradient(circle, ${color}20, transparent)`,
          opacity: 0.3,
        }}
      >
        <div 
          className="w-6 h-6 rounded-full border-2"
          style={{ borderColor: color, opacity: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

export function Background() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient de fond animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#0d0d1a] to-[#0a0a12]" />
      
      {/* Orbes de lumière ambiante */}
      <motion.div 
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[150px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-900/15 blur-[120px]"
        animate={{ 
          x: [0, -40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[180px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Cartes flottantes */}
      {mounted && CARDS.map((card, i) => (
        <FloatingCard key={i} card={card} index={i} total={CARDS.length} />
      ))}

      {/* Jetons flottants */}
      {mounted && Array.from({ length: 5 }).map((_, i) => (
        <FloatingChip key={`chip-${i}`} index={i} />
      ))}

      {/* Particules dorées */}
      {mounted && Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gold"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            opacity: 0.2 + Math.random() * 0.3,
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, Math.sin(i) * 30, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Effet de vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Lignes subtiles */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  )
}
