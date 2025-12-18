import { useEffect, useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Trophy } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
  }

  const hideToast = () => setToast(null)

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <Toast 
            key={toast.id}
            message={toast.message} 
            type={toast.type} 
            onClose={hideToast} 
          />
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const isSuccess = type === 'success'
  const isVictory = message.includes('🏆') || message.includes('victoire')

  return (
    <motion.div 
      className={`
        fixed bottom-6 right-6 flex items-center gap-4 px-6 py-4
        rounded-2xl shadow-2xl z-50 backdrop-blur-xl
        ${isSuccess 
          ? 'bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white' 
          : 'bg-gradient-to-r from-red-500/90 to-rose-500/90 text-white'
        }
      `}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {/* Glow */}
      <div className={`absolute inset-0 rounded-2xl blur-xl ${isSuccess ? 'bg-emerald-500/30' : 'bg-red-500/30'}`} />
      
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="relative"
      >
        {isVictory ? (
          <Trophy className="w-6 h-6" />
        ) : isSuccess ? (
          <Check className="w-6 h-6" />
        ) : (
          <X className="w-6 h-6" />
        )}
      </motion.div>
      
      {/* Message */}
      <span className="relative font-medium">{message}</span>
      
      {/* Progress bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4, ease: "linear" }}
      />
    </motion.div>
  )
}
