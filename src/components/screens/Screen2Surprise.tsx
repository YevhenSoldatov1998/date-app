import { motion } from 'framer-motion'
import content from '@/config/content.json'

interface Props {
  onContinue: () => void
}

export default function Screen2Surprise({ onContinue }: Props) {
  const { screen2 } = content

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="floating-hearts">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: `${(i * 7 + 5) % 100}%`,
              animationDuration: `${5 + (i * 0.9) % 5}s`,
              animationDelay: `${(i * 0.5) % 3}s`,
            }}
          >
            {['💕', '💖', '🌸', '✨', '💗', '🦋'][i % 6]}
          </span>
        ))}
      </div>

      <motion.div
        className="card text-center z-10"
        initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        <motion.div
          className="text-7xl mb-5"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        >
          {screen2.emoji}
        </motion.div>

        <motion.h2
          style={{ fontFamily: 'Pacifico, cursive' }}
          className="text-2xl font-normal text-pink-600 mb-3 leading-snug"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {screen2.title}
        </motion.h2>

        <motion.p
          className="text-gray-400 text-sm mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {screen2.subtitle}
        </motion.p>

        <motion.button
          className="btn-primary"
          onClick={onContinue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.95 }}
        >
          {screen2.continueLabel}
        </motion.button>
      </motion.div>
    </div>
  )
}
