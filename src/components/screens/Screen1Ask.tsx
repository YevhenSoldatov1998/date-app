import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import content from '@/config/content.json'

interface Props {
  onYes: () => void
}

const MARGIN = 16

function getRandomPos(btnW: number, btnH: number) {
  const maxX = window.innerWidth - btnW - MARGIN
  const maxY = window.innerHeight - btnH - MARGIN
  return {
    x: Math.max(MARGIN, Math.random() * maxX),
    y: Math.max(MARGIN, Math.random() * maxY),
  }
}

export default function Screen1Ask({ onYes }: Props) {
  const { screen1 } = content
  const btnRef = useRef<HTMLButtonElement>(null)

  // null = inside card (initial state), object = escaped to viewport coords
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null)
  const [escaped, setEscaped] = useState(0)

  const flee = useCallback(() => {
    const w = btnRef.current?.offsetWidth ?? 90
    const h = btnRef.current?.offsetHeight ?? 44
    setNoPos(getRandomPos(w, h))
    setEscaped((n) => n + 1)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current) return
      const r = btnRef.current.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      if (Math.hypot(e.clientX - cx, e.clientY - cy) < 80) flee()
    },
    [flee]
  )

  const funMessages = [
    '', 'Куди-куди? 😏', 'Не так просто! 😄',
    'Спробуй ще! 😜', 'Ти впевнена? 😅', 'Може все ж ТАК? 🥺',
  ]

  return (
    <div className="fixed inset-0 flex items-center justify-center" onMouseMove={handleMouseMove}>
      {/* floating petals */}
      <div className="floating-hearts">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: `${(i * 11) % 100}%`,
              animationDuration: `${6 + (i * 1.3) % 6}s`,
              animationDelay: `${(i * 0.7) % 4}s`,
              fontSize: `${0.8 + (i % 3) * 0.4}rem`,
            }}
          >
            {['🌸', '💕', '✨', '🌷', '💝'][i % 5]}
          </span>
        ))}
      </div>

      {/* Card */}
      <motion.div
        className="card text-center z-10"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {screen1.emoji}
        </motion.div>

        <h1
          style={{ fontFamily: 'Pacifico, cursive' }}
          className="text-2xl font-normal text-pink-600 mb-6 leading-snug"
        >
          {screen1.question}
        </h1>

        {escaped > 0 && (
          <motion.p
            key={escaped}
            className="text-pink-400 text-sm mb-4 font-semibold"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {funMessages[Math.min(escaped, funMessages.length - 1)]}
          </motion.p>
        )}

        {/* Buttons row - NO stays here until first flee */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            className="btn-primary text-lg px-8 py-3"
            whileTap={{ scale: 0.95 }}
            onClick={onYes}
          >
            {screen1.yesLabel}
          </motion.button>

          {/* NO button - inline until first escape */}
          {noPos === null && (
            <button
              ref={btnRef}
              className="btn-no"
              style={{ position: 'relative', left: 'auto', top: 'auto' }}
              onMouseEnter={flee}
              onTouchStart={(e) => { e.preventDefault(); flee() }}
              onClick={(e) => { e.preventDefault(); flee() }}
            >
              {screen1.noLabel}
            </button>
          )}
        </div>
      </motion.div>

      {/* NO button floating in viewport after first escape */}
      {noPos !== null && (
        <button
          ref={btnRef}
          className="btn-no"
          style={{
            position: 'fixed',
            left: noPos.x,
            top: noPos.y,
            transition: 'left 0.25s cubic-bezier(.34,1.56,.64,1), top 0.25s cubic-bezier(.34,1.56,.64,1)',
            zIndex: 50,
          }}
          onMouseEnter={flee}
          onTouchStart={(e) => { e.preventDefault(); flee() }}
          onClick={(e) => { e.preventDefault(); flee() }}
        >
          {screen1.noLabel}
        </button>
      )}
    </div>
  )
}
