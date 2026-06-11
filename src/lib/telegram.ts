import content from '@/config/content.json'

export async function sendTelegramNotification(
  date: string,
  time: string,
  activityLabel: string
): Promise<boolean> {
  const { botToken, chatId } = content.telegram

  if (chatId === 'YOUR_CHAT_ID_HERE') {
    console.warn('Telegram chatId not configured in content.json')
    return false
  }

  const text = content.screen5.telegramMessage
    .replace('{date}', date)
    .replace('{time}', time)
    .replace('{activity}', activityLabel)

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      }
    )
    return res.ok
  } catch (e) {
    console.error('Telegram error:', e)
    return false
  }
}
