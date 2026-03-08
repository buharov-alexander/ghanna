# Сайт-визитка мастера бровиста

Современный адаптивный сайт для мастера бровиста с формой обратной связи и портфолио работ.

## 🎨 Особенности

- **Современный дизайн** с использованием Tailwind CSS
- **Полностью адаптивная верстка** для всех устройств
- **Интерактивная форма обратной связи** с валидацией
- **Множественные способы связи** (телефон, email, Telegram)
- **Анимации и переходы** для улучшения UX
- **SEO-оптимизированная структура**

## 📁 Структура файлов

```
├── index.html          # Основная HTML-страница
├── script.js           # JavaScript функционал
├── README.md           # Документация
└── assets/             # Папка для изображений (если нужно)
```

## 🚀 Быстрый запуск

1. Откройте `index.html` в браузере
2. Или запустите локальный сервер:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (если установлен)
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```
3. Откройте `http://localhost:8000` в браузере

## ⚙️ Функционал

### Форма обратной связи
- Валидация полей в реальном времени
- Маска для телефона
- Проверка времени работы
- Выбор способа связи
- Сохранение заявок в localStorage

### Способы связи
- **Телефон**: клик для копирования номера
- **Email**: открытие почтового клиента
- **Telegram**: переход в чат с мастером

### Адаптивность
- Мобильное меню
- Оптимизированные анимации
- Touch-friendly интерфейс

## 🎯 Кастомизация

### Изменение контактной информации
Отредактируйте следующие строки в `index.html`:

```html
<!-- Телефон -->
<p class="text-gray-600">+7 (999) 123-45-67</p>

<!-- Email -->
<p class="text-gray-600">maria.brows@example.com</p>

<!-- Telegram -->
<p class="text-gray-600">@maria_brows_master</p>

<!-- Адрес -->
<p class="text-gray-600">г. Москва, ул. Красная, 1</p>
```

### Изменение услуг
Обновите секцию `#services` в `index.html`:

```html
<div class="card-hover bg-white rounded-lg p-6 shadow-md">
    <h3 class="text-xl font-semibold text-gray-800 mb-2">Название услуги</h3>
    <p class="text-gray-600 mb-4">Описание услуги</p>
    <div class="text-center">
        <span class="text-2xl font-bold text-purple-600">Цена ₽</span>
    </div>
</div>
```

### Настройка цветов
Измените градиенты в `index.html`:

```css
.hero-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📱 Совместимость

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## 🔧 Интеграция с backend

Для полной функциональности можно добавить:

### Отправка на сервер
В `script.js` замените функцию `simulateFormSubmission`:

```javascript
async function sendToServer(data) {
    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
}
```

### Telegram Bot
Добавьте интеграцию с Telegram API:

```javascript
async function sendToTelegram(message) {
    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });
    
    return response.json();
}
```

## 📊 Аналитика

Добавьте Google Analytics или Яндекс.Метрику в `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Поддержка

При возникновении вопросов:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все файлы находятся в одной папке
3. Проверьте подключение к интернету для CDN-ресурсов

## 📄 Лицензия

MIT License - свободное использование и модификация.
