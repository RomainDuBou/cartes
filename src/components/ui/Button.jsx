import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: 'btn-primary',
  secondary: `
    bg-white/5 text-white border border-white/10
    hover:bg-white/10 hover:border-white/20
  `,
  ghost: `
    text-white/60 hover:text-white hover:bg-white/5
  `,
  danger: `
    bg-red-500/10 text-red-400 border border-red-500/20
    hover:bg-red-500/20 hover:border-red-500/30
  `,
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3 text-lg',
}

export const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}, ref) => {
  const isPrimary = variant === 'primary'
  
  return (
    <motion.button
      ref={ref}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-all duration-300 relative overflow-hidden
        ${isPrimary ? variants.primary : variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
})

Button.displayName = 'Button'
