import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <motion.footer 
      className="relative z-10 border-t border-white/[0.05] mt-16 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm flex items-center gap-2">
          <span className="text-xl">🃏</span>
          <span>Géan Bresilen</span>
          <span className="text-white/20">•</span>
          <span>© {new Date().getFullYear()}</span>
        </p>
        
        <p className="text-white/20 text-sm flex items-center gap-2">
          Fait avec
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </motion.span>
          pour les soirées cartes
        </p>
      </div>
    </motion.footer>
  )
}
