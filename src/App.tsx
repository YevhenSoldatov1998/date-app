import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Screen1Ask from '@/components/screens/Screen1Ask'
import Screen2Surprise from '@/components/screens/Screen2Surprise'
import Screen3When from '@/components/screens/Screen3When'
import Screen4Activity from '@/components/screens/Screen4Activity'
import Screen5Final from '@/components/screens/Screen5Final'
import { startMelody } from '@/lib/melody'

type Screen = 1 | 2 | 3 | 4 | 5

interface DateData {
  date: string
  time: string
  activityId: string
  activityLabel: string
}

const slideVariants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(1)
  const [dateData, setDateData] = useState<DateData>({
    date: '',
    time: '',
    activityId: '',
    activityLabel: '',
  })
  const [melodyStarted, setMelodyStarted] = useState(false)

  const initMelody = useCallback(() => {
    if (!melodyStarted) {
      startMelody()
      setMelodyStarted(true)
    }
  }, [melodyStarted])

  useEffect(() => {
    const handler = () => initMelody()
    window.addEventListener('click', handler, { once: true })
    window.addEventListener('touchstart', handler, { once: true })
    return () => {
      window.removeEventListener('click', handler)
      window.removeEventListener('touchstart', handler)
    }
  }, [initMelody])

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="absolute inset-0"
        >
          {screen === 1 && (
            <Screen1Ask onYes={() => setScreen(2)} />
          )}

          {screen === 2 && (
            <Screen2Surprise onContinue={() => setScreen(3)} />
          )}

          {screen === 3 && (
            <Screen3When
              onSubmit={(date, time) => {
                setDateData((d) => ({ ...d, date, time }))
                setScreen(4)
              }}
            />
          )}

          {screen === 4 && (
            <Screen4Activity
              onSubmit={(id, label) => {
                setDateData((d) => ({ ...d, activityId: id, activityLabel: label }))
                setScreen(5)
              }}
            />
          )}

          {screen === 5 && (
            <Screen5Final
              date={dateData.date}
              time={dateData.time}
              activityLabel={dateData.activityLabel}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
