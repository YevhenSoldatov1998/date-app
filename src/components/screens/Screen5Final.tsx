import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import content from '@/config/content.json'
import { sendTelegramNotification } from '@/lib/telegram'
import { formatDateUk } from '@/lib/utils'

interface Props {
  date: string
  time: string
  activityLabel: string
}

function Confetti() {
  return (
    <div className="floating-hearts">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 5 + 3) % 100}%`,
            fontSize: `${0.9 + (i % 4) * 0.3}rem`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.8, 0.6, 0] }}
          transition={{
            duration: 4 + (i % 4),
            delay: (i % 8) * 0.3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {['💕', '🌸', '✨', '💖', '🦋', '💫', '🌷', '💗'][i % 8]}
        </motion.span>
      ))}
    </div>
  )
}

export default function Screen5Final({ date, time, activityLabel }: Props) {
  const { screen5 } = content
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current) return
    sent.current = true
    sendTelegramNotification(formatDateUk(date), time, activityLabel)
  }, [date, time, activityLabel])

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Confetti />

      <motion.div
        className="card text-center z-10"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
          🥰
        </motion.div>

        <h2
          style={{ fontFamily: 'Pacifico, cursive' }}
          className="text-2xl font-normal text-pink-600 mb-2"
        >
          {screen5.title}
        </h2>

        <p className="text-gray-400 text-sm mb-6">{screen5.subtitle}</p>

        <div className="bg-pink-50 rounded-2xl p-4 space-y-2 text-left">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="text-xl">📅</span>
            <span className="font-bold">{formatDateUk(date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="text-xl">⏰</span>
            <span className="font-bold">{time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="text-xl">🗺️</span>
            <span className="font-bold">{activityLabel}</span>
          </div>
        </div>

        <motion.p
          className="mt-5 text-pink-400 text-xs"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💌 Вже отримав сповіщення ♥
        </motion.p>
      </motion.div>
    </div>
  )
}
