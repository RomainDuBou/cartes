import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export function Modal({ isOpen, onClose, title, children }) {
  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Content */}
          <motion.div 
            className="modal-content relative w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Glow effect - hidden on mobile */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-3xl blur-xl opacity-50 pointer-events-none hidden sm:block" />
            
            {/* Drag indicator on mobile */}
            <div className="sm:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1" />
            
            {/* Header - Fixed */}
            <div className="relative flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 bg-gradient-to-r from-card-black to-velvet sm:rounded-t-3xl">
              <h3 className="font-display text-lg sm:text-2xl font-bold bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
                {title}
              </h3>
              <motion.button 
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
            
            {/* Body - Scrollable */}
            <div className="relative flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function ModalBody({ children, className = '' }) {
  return (
    <div className={`p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

export function ModalFooter({ children, className = '' }) {
  return (
    <div className={`flex-shrink-0 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-4 border-t border-white/10 bg-card-black/90 backdrop-blur-sm sticky bottom-0 ${className}`}>
      {children}
    </div>
  )
}
