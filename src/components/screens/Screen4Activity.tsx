import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import content from '@/config/content.json'

interface Props {
  onSubmit: (activityId: string, activityLabel: string) => void
}

export default function Screen4Activity({ onSubmit }: Props) {
  const { screen4 } = content
  const [selected, setSelected] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!selected) return
    const act = screen4.activities.find((a) => a.id === selected)
    if (act) onSubmit(act.id, `${act.emoji} ${act.label}`)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="floating-hearts">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: `${(i * 12 + 8) % 100}%`,
              animationDuration: `${6 + (i * 0.8) % 5}s`,
              animationDelay: `${(i * 0.6) % 3}s`,
            }}
          >
            {['✨', '💫', '🌸', '💕'][i % 4]}
          </span>
        ))}
      </div>

      <motion.div
        className="card z-10"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-1">{screen4.emoji}</div>
          <h2
            style={{ fontFamily: 'Pacifico, cursive' }}
            className="text-xl font-normal text-pink-600"
          >
            {screen4.title}
          </h2>
          <p className="text-gray-400 text-sm mt-1">{screen4.subtitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {screen4.activities.map((act, i) => (
            <motion.button
              key={act.id}
              className={cn('activity-card', selected === act.id && 'selected')}
              onClick={() => setSelected(act.id)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl mb-1">{act.emoji}</div>
              <div className="text-xs font-bold text-gray-600">{act.label}</div>
            </motion.button>
          ))}
        </div>

        <motion.button
          className={cn('btn-primary w-full', !selected && 'opacity-50')}
          onClick={handleSubmit}
          whileTap={{ scale: selected ? 0.97 : 1 }}
          animate={selected ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {screen4.submitLabel}
        </motion.button>
      </motion.div>
    </div>
  )
}
