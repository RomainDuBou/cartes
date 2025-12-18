import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Search, Info, Sparkles } from 'lucide-react'
import { BADGES, BADGE_CATEGORIES, BADGE_CATEGORY_COLORS } from '../utils/constants'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  }
}

export function BadgesPage() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBadge, setSelectedBadge] = useState(null)

  // Filtrer les badges
  const filteredBadges = BADGES.filter(badge => {
    const matchesCategory = !activeCategory || badge.category === activeCategory
    const matchesSearch = !searchTerm || 
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Grouper les badges par catégorie
  const badgesByCategory = BADGE_CATEGORIES.map(cat => ({
    ...cat,
    badges: filteredBadges.filter(b => b.category === cat.value)
  })).filter(cat => cat.badges.length > 0)

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      {/* Header */}
      <motion.div 
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold/20 to-amber-500/10 border border-gold/30 mb-4 sm:mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Award className="w-7 h-7 sm:w-10 sm:h-10 text-gold" />
        </motion.div>
        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent mb-2 sm:mb-4">
          Encyclopédie des Badges
        </h1>
        <p className="text-white/50 text-sm sm:text-lg max-w-2xl mx-auto px-2">
          Découvrez tous les badges et leurs significations.
        </p>
      </motion.div>

      {/* Stats rapides */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="glass rounded-xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl font-bold text-gold">{BADGES.length}</div>
          <div className="text-white/50 text-xs sm:text-sm">Total</div>
        </div>
        <div className="glass rounded-xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl font-bold text-purple-400">{BADGE_CATEGORIES.length}</div>
          <div className="text-white/50 text-xs sm:text-sm">Catégories</div>
        </div>
        <div className="glass rounded-xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl font-bold text-emerald-400">
            {BADGES.filter(b => b.category === 'special').length}
          </div>
          <div className="text-white/50 text-xs sm:text-sm">Spéciaux</div>
        </div>
        <div className="glass rounded-xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl font-bold text-blue-400">
            {BADGES.filter(b => b.category === 'strategie').length}
          </div>
          <div className="text-white/50 text-xs sm:text-sm">Stratégie</div>
        </div>
      </motion.div>

      {/* Recherche et filtres */}
      <motion.div 
        className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/30" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un badge..."
            className="form-input w-full pl-10 sm:pl-12 py-2.5 sm:py-3 text-sm sm:text-base"
          />
        </div>

        {/* Filtre par catégorie - Scrollable horizontalement sur mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeCategory === null 
                ? 'bg-gold/20 text-gold border border-gold/30' 
                : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
            }`}
          >
            Tous
          </button>
          {BADGE_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(activeCategory === cat.value ? null : cat.value)}
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.value 
                  ? 'bg-gold/20 text-gold border border-gold/30' 
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Résultats de recherche */}
      {searchTerm && (
        <motion.p 
          className="text-white/50 mb-4 sm:mb-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredBadges.length} badge{filteredBadges.length > 1 ? 's' : ''} trouvé{filteredBadges.length > 1 ? 's' : ''}
        </motion.p>
      )}

      {/* Liste des badges par catégorie */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory || 'all'}
          className="space-y-8 sm:space-y-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {badgesByCategory.map(category => (
            <motion.section key={category.value} variants={item}>
              {/* Header de catégorie */}
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r ${BADGE_CATEGORY_COLORS[category.value]} border text-sm sm:text-base`}>
                  <span>{category.label}</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                <span className="text-white/30 text-xs sm:text-sm">{category.badges.length}</span>
              </div>
              <p className="text-white/40 text-xs sm:text-sm mb-4 sm:mb-6 -mt-2">{category.description}</p>

              {/* Grille de badges */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {category.badges.map(badge => (
                  <motion.div
                    key={badge.value}
                    className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-300 ${
                      selectedBadge?.value === badge.value 
                        ? `bg-gradient-to-br ${BADGE_CATEGORY_COLORS[badge.category]} border-2`
                        : 'bg-white/[0.03] border border-white/5 hover:border-white/20'
                    }`}
                    onClick={() => setSelectedBadge(selectedBadge?.value === badge.value ? null : badge)}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    layout
                  >
                    {/* Icône et nom */}
                    <div className="flex items-start gap-3 sm:gap-4">
                      <motion.div 
                        className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {badge.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-gold transition-colors">
                          {badge.name}
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm mt-1 leading-relaxed">
                          {badge.description}
                        </p>
                      </div>
                    </div>

                    {/* Indicateur de sélection */}
                    {selectedBadge?.value === badge.value && (
                      <motion.div
                        className="absolute top-2 right-2 sm:top-3 sm:right-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Message si aucun résultat */}
      {filteredBadges.length === 0 && (
        <motion.div 
          className="text-center py-16 sm:py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-5xl sm:text-6xl mb-4 opacity-30">🔍</div>
          <h3 className="text-lg sm:text-xl text-white/50 mb-2">Aucun badge trouvé</h3>
          <p className="text-white/30 text-sm">Essayez avec d'autres termes</p>
        </motion.div>
      )}

      {/* Info box */}
      <motion.div 
        className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gold/5 to-amber-500/5 border border-gold/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-gold mb-1 sm:mb-2">
              Comment obtenir des badges ?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Les badges sont attribués aléatoirement lors de l'enregistrement d'une victoire. 
              Chaque badge raconte une partie de l'histoire de votre victoire !
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
