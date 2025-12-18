export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`
        rounded-2xl overflow-hidden
        bg-gradient-to-br from-white/10 to-white/5
        border border-white/10 backdrop-blur-sm
        ${hover ? 'hover:border-gold/30 transition-all duration-500' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-b border-white/10 ${className}`}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 bg-white/5 border-t border-white/10 ${className}`}>
      {children}
    </div>
  )
}

