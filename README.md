# 💌 Date Invite App

Міні-застосунок для запрошення на побачення. Задає питання, збирає дату/час/активність і надсилає сповіщення в Telegram.

## Деплой на Vercel

### Варіант 1 — через CLI (найшвидший)

```bash
npm i -g vercel
vercel
```

Vercel автоматично визначить Vite-проєкт і задасть кілька питань. Готово.

### Варіант 2 — через GitHub

1. Запушити репо на GitHub
2. Відкрити [vercel.com](https://vercel.com) → **Add New Project**
3. Вибрати репо → **Deploy**

Налаштування збірки Vercel підхопить сам (`vite build`, output: `dist`).

## Адаптація під себе

Весь контент зосереджений в одному файлі:

**`src/config/content.json`**

| Що змінити | Де шукати |
|---|---|
| Текст запитання, кнопки | `screen1`, `screen2`, `screen3`, `screen5` |
| Список активностей | `screen4.activities` |
| Telegram-бот для сповіщень | `telegram.botToken`, `telegram.chatId` |
| Формат повідомлення в Telegram | `screen5.telegramMessage` |

### Telegram-бот

1. Написати [@BotFather](https://t.me/BotFather) → `/newbot` → отримати `botToken`
2. Написати самому боту або додати в чат, потім відкрити `https://api.telegram.org/bot<TOKEN>/getUpdates` — знайти свій `id` у полі `chat.id`
3. Вставити обидва значення в `content.json`

### Звук

Замінити `public/sound.mp3` на свій файл (той самий шлях, та сама назва).

### Зображення

Замінити `src/assets/hero.png` на своє фото/ілюстрацію.
