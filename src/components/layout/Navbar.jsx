import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Home, Sparkles, Award, Menu, X, Plus } from 'lucide-react'

// Logo personnalisé avec cartes
function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Icône de cartes empilées */}
      <motion.div 
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Carte arrière */}
        <motion.div 
          className="absolute inset-0 w-8 h-10 sm:w-9 sm:h-11 md:w-10 md:h-12 rounded-md bg-gradient-to-br from-red-500 to-red-700 border border-red-400/50 shadow-lg"
          style={{ 
            left: '0%', 
            top: '10%',
            transform: 'rotate(-15deg)',
          }}
          animate={{ rotate: [-15, -12, -15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute top-0.5 left-1 text-[8px] sm:text-[10px] font-bold text-white">♥</span>
          <span className="absolute bottom-0.5 right-1 text-[8px] sm:text-[10px] font-bold text-white rotate-180">♥</span>
        </motion.div>
        
        {/* Carte milieu */}
        <motion.div 
          className="absolute inset-0 w-8 h-10 sm:w-9 sm:h-11 md:w-10 md:h-12 rounded-md bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 shadow-lg"
          style={{ 
            left: '15%', 
            top: '5%',
            transform: 'rotate(0deg)',
          }}
        >
          <span className="absolute top-0.5 left-1 text-[8px] sm:text-[10px] font-bold text-white">♠</span>
          <span className="absolute bottom-0.5 right-1 text-[8px] sm:text-[10px] font-bold text-white rotate-180">♠</span>
        </motion.div>
        
        {/* Carte avant */}
        <motion.div 
          className="absolute inset-0 w-8 h-10 sm:w-9 sm:h-11 md:w-10 md:h-12 rounded-md bg-gradient-to-br from-gold to-amber-600 border border-gold/50 shadow-xl"
          style={{ 
            left: '30%', 
            top: '0%',
            transform: 'rotate(15deg)',
          }}
          animate={{ rotate: [15, 18, 15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute top-0.5 left-1 text-[8px] sm:text-[10px] font-bold text-black">A</span>
          <span className="absolute inset-0 flex items-center justify-center text-base sm:text-lg text-black font-bold">♦</span>
          <span className="absolute bottom-0.5 right-1 text-[8px] sm:text-[10px] font-bold text-black rotate-180">A</span>
        </motion.div>

        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 bg-gold/30 rounded-full blur-xl -z-10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Texte */}
      <div className="flex flex-col">
        <motion.div 
          className="flex items-baseline gap-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="font-display text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent">
            CARTES
          </span>
          <motion.span 
            className="text-gold text-lg sm:text-xl md:text-2xl"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ♠
          </motion.span>
        </motion.div>
        <span className="text-[7px] sm:text-[8px] md:text-[10px] text-white/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium -mt-0.5">
          Tableau de Victoires
        </span>
      </div>
    </div>
  )
}

export function Navbar({ onNewGame }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-50 border-b border-white/[0.06] backdrop-blur-xl bg-black/30"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <Logo />
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {!isHome && (
              <NavLink to="/" icon={Home}>Accueil</NavLink>
            )}
            <NavLink to="/players" icon={Users}>Joueurs</NavLink>
            <NavLink to="/badges" icon={Award}>Badges</NavLink>
            
            {isHome && onNewGame && (
              <motion.button
                onClick={onNewGame}
                className="btn-primary flex items-center gap-2 ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Nouvelle Partie</span>
              </motion.button>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            {isHome && onNewGame && (
              <motion.button
                onClick={onNewGame}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-gold to-amber-500 flex items-center justify-center text-black shadow-lg shadow-gold/20"
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            )}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-2">
                {!isHome && (
                  <MobileNavLink to="/" icon={Home} onClick={() => setMobileMenuOpen(false)}>
                    Accueil
                  </MobileNavLink>
                )}
                <MobileNavLink to="/players" icon={Users} onClick={() => setMobileMenuOpen(false)}>
                  Joueurs
                </MobileNavLink>
                <MobileNavLink to="/badges" icon={Award} onClick={() => setMobileMenuOpen(false)}>
                  Badges
                </MobileNavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

function NavLink({ to, icon: Icon, children }) {
  return (
    <Link to={to}>
      <motion.div 
        className="nav-link"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{children}</span>
      </motion.div>
    </Link>
  )
}

function MobileNavLink({ to, icon: Icon, children, onClick }) {
  return (
    <Link to={to} onClick={onClick}>
      <motion.div 
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white/80 active:bg-white/10"
        whileTap={{ scale: 0.98 }}
      >
        <Icon className="w-5 h-5 text-gold" />
        <span className="font-medium">{children}</span>
      </motion.div>
    </Link>
  )
}
