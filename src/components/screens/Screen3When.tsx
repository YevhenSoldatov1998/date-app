import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import content from '@/config/content.json'

interface Props {
  onSubmit: (date: string, time: string) => void
}

interface FormValues {
  date: string
  time: string
}

const todayStr = () => new Date().toISOString().split('T')[0]

const schema = yup.object({
  date: yup
    .string()
    .required(content.screen3.validation.dateRequired)
    .test('future', content.screen3.validation.datePast, (v) => {
      if (!v) return false
      return v >= todayStr()
    }),
  time: yup.string().required(content.screen3.validation.timeRequired),
})

export default function Screen3When({ onSubmit }: Props) {
  const { screen3 } = content
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const onValid = (data: FormValues) => onSubmit(data.date, data.time)

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="floating-hearts">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: `${(i * 13 + 3) % 100}%`,
              animationDuration: `${7 + (i * 1.1) % 5}s`,
              animationDelay: `${(i * 0.8) % 4}s`,
            }}
          >
            {['📅', '💕', '✨', '🌸'][i % 4]}
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
          <div className="text-5xl mb-3">{screen3.emoji}</div>
          <h2
            style={{ fontFamily: 'Pacifico, cursive' }}
            className="text-2xl font-normal text-pink-600"
          >
            {screen3.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onValid)} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1.5">
              {screen3.dayLabel}
            </label>
            <input
              type="date"
              min={todayStr()}
              {...register('date')}
            />
            {errors.date && (
              <p className="error-msg">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1.5">
              {screen3.timeLabel}
            </label>
            <select {...register('time')}>
              <option value="">{screen3.timePlaceholder}</option>
              {screen3.times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="error-msg">{errors.time.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            className="btn-primary w-full mt-2"
            whileTap={{ scale: 0.97 }}
          >
            {screen3.submitLabel}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
