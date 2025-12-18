import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, Trash2, Check } from 'lucide-react'
import { Button } from './Button'

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmation",
  message = "Êtes-vous sûr ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "danger" // danger, warning, info
}) {
  const variants = {
    danger: {
      icon: <Trash2 className="w-8 h-8 text-red-400" />,
      iconBg: 'bg-red-500/20',
      buttonClass: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'
    },
    warning: {
      icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
      iconBg: 'bg-amber-500/20',
      buttonClass: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400'
    },
    info: {
      icon: <Check className="w-8 h-8 text-blue-400" />,
      iconBg: 'bg-blue-500/20',
      buttonClass: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400'
    }
  }

  const currentVariant = variants[variant] || variants.danger

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 rounded-3xl blur-xl opacity-50" />
            
            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f] border border-white/10">
              {/* Close button */}
              <motion.button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Body */}
              <div className="p-8 text-center">
                {/* Icon */}
                <motion.div 
                  className={`w-20 h-20 rounded-full ${currentVariant.iconBg} flex items-center justify-center mx-auto mb-6`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  {currentVariant.icon}
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className="text-2xl font-display font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {title}
                </motion.h3>

                {/* Message */}
                <motion.p 
                  className="text-white/60 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {message}
                </motion.p>

                {/* Buttons */}
                <motion.div 
                  className="flex gap-3 justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Button variant="ghost" onClick={onClose}>
                    {cancelText}
                  </Button>
                  <motion.button
                    onClick={handleConfirm}
                    className={`px-6 py-3 rounded-xl font-semibold text-white ${currentVariant.buttonClass} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {confirmText}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

