import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Award, List } from 'lucide-react'
import { StatsCards, Podium, Leaderboard, GamesHistory } from '../components/home'
import { GameModal } from '../components/game'
import { useToast } from '../components/ui'

export function HomePage({ isModalOpen, setIsModalOpen }) {
  const [view, setView] = useState('podium')
  const [editingGame, setEditingGame] = useState(null)
  const { showToast } = useToast()

  const handleGameSuccess = (message) => {
    showToast(message || '🏆 Victoire enregistrée !!')
  }

  const handleEditGame = (game) => {
    setEditingGame(game)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingGame(null)
  }

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      {/* Stats */}
      <StatsCards />

      {/* Classement */}
      <motion.section 
        className="mb-8 sm:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
            </motion.div>
            Classement
          </h2>
          
          <div className="flex gap-1 sm:gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/5 self-start sm:self-auto">
            <button 
              onClick={() => setView('podium')}
              className={`view-btn text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 ${view === 'podium' ? 'active' : ''}`}
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Podium
            </button>
            <button 
              onClick={() => setView('list')}
              className={`view-btn text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 ${view === 'list' ? 'active' : ''}`}
            >
              <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Liste
            </button>
          </div>
        </div>

        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'podium' ? <Podium /> : <Leaderboard />}
        </motion.div>
      </motion.section>

      {/* Historique */}
      <GamesHistory onEditGame={handleEditGame} />

      {/* Modal */}
      <GameModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleGameSuccess}
        editGame={editingGame}
      />
    </main>
  )
}
