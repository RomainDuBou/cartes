import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Background, Navbar, Footer } from './components/layout'
import { ToastProvider } from './components/ui'
import { HomePage, PlayerPage, BadgesPage } from './pages'
import { useGame } from './context/GameContext'

// Écran de chargement
function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Background />
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div 
          className="text-8xl mb-6"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🃏
        </motion.div>
        <h2 className="font-display text-2xl text-gold mb-2">Chargement...</h2>
        <p className="text-white/50">Synchronisation avec la base de données</p>
      </motion.div>
    </div>
  )
}

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { loading } = useGame()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar onNewGame={() => setIsModalOpen(true)} />
      
      <div className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen} 
              />
            } 
          />
          <Route path="/players" element={<PlayerPage />} />
          <Route path="/players/:playerId" element={<PlayerPage />} />
          <Route path="/badges" element={<BadgesPage />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

export default App

