# Конфигурация лендинга

Перед развертыванием отредактируйте этот файл со своими данными.

## Информация о компании

```javascript
company: {
    name: "Ремонт 24/7",                    // Название компании
    phone: "+7 (999) 123-45-67",             // Номер телефона
    email: "info@yoursite.ru",               // Email
    telegram: "your_username",               // Ник в Telegram
    whatsapp: "79991234567",                 // WhatsApp (без + и пробелов)
    address: "г. Москва, ул. Примерная, д. 1" // Адрес офиса
}
```

## Telegram интеграция

```javascript
telegram: {
    link: "https://t.me/your_username",              // Ссылка на Telegram
    startMessage: "Привет! Я заинтересован..."      // Начальное сообщение
}
```

## Аналитика

### Google Analytics

1. Перейдите на https://analytics.google.com
2. Создайте новый проект
3. Получите ID (G-XXXXXXXXXX)
4. Замените в `index.html`:
   - `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`
   - `gtag('config', 'G-XXXXXXXXXX');`

### Яндекс.Метрика

1. Перейдите на https://metrica.yandex.ru
2. Создайте новый счётчик
3. Получите ID (только цифры)
4. Замените в `index.html`:
   - `ym(XXXXXXXXX, "init", {...})`

## Настройка изображений

### Структура папок images/

```
images/
├── hero/              # Главный фон (не менее 1920x1080px)
│   └── main.jpg
├── portfolio/         # Примеры работ (280x250px)
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ... (20+ фото)
├── team/             # Фото команды (400x500px)
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ... (4-6 фото)
├── testimonials/     # Фото клиентов (50x50px)
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ... (6-8 фото)
├── icons/            # Иконки и SVG
├── logo.svg          # Логотип компании
├── favicon.svg       # Иконка браузера
└── og-image.jpg      # Для соц. сетей (1200x630px)
```

### Рекомендуемые форматы

- **Главный герой:** JPG, 1920x1080px, оптимизирован (200-300KB)
- **Галерея работ:** JPG, 280x250px (20-50KB каждое)
- **Фото команды:** JPG, 400x500px (80-150KB каждое)
- **Портреты клиентов:** JPG, 50x50px (5-10KB каждое)
- **Логотип:** SVG (предпочтительно)

## Содержание (контент)

### Обновление текста

Все текстовые описания находятся в `index.html`. Найдите и отредактируйте:

1. **Заголовки:**
   - Hero title: "Ремонт квартир под ключ с гарантией качества"
   - Hero subtitle: "От бюджетного ремонта до люкс-отделки..."

2. **Услуги (Services):**
   - Названия: Косметический, Среднее, Люкс
   - Описания и списки
   - Стоимость (от X до Y)
   - Сроки выполнения

3. **Отзывы (Testimonials):**
   - Имена клиентов
   - Их отзывы (50-150 слов)
   - Даты

4. **Команда (Team):**
   - Имена и должности
   - Опыт работы
   - Биография (2-3 предложения)
   - Количество проектов

5. **Контакты:**
   - Телефон
   - Email
   - Telegram
   - Адрес

## Оптимизация для Telegram

Все кнопки должны открывать Telegram с ссылкой:

```
https://t.me/ваше_имя?start=landing_source
```

При необходимости добавьте предзаполненное сообщение через Telegram Bot API.

## SEO Оптимизация

### Meta-теги (в `<head>`)

```html
<meta name="description" content="Ваше описание (155 символов)">
<meta name="keywords" content="ремонт квартир, отделка, ремонт Москва, ...">
<meta property="og:title" content="Ремонт квартир под ключ">
<meta property="og:description" content="Описание (до 160 символов)">
<meta property="og:image" content="https://yoursite.ru/images/og-image.jpg">
```

### Sitemap.xml

Создайте файл `sitemap.xml` в корне:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.ru/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### robots.txt

Создайте файл `robots.txt` в корне:

```
User-agent: *
Allow: /
Sitemap: https://yoursite.ru/sitemap.xml
```

## Развертывание

### На GitHub Pages

```bash
# 1. Инициализируйте репозиторий
git init

# 2. Добавьте файлы
git add .

# 3. Сделайте первый коммит
git commit -m "Initial commit: Landing page"

# 4. Добавьте удаленный репозиторий
git remote add origin https://github.com/yourusername/remont-landing.git

# 5. Отправьте код
git push -u origin main

# 6. В GitHub: Settings > Pages > Select branch "main"
```

### На Netlify

```bash
# Подключите через Netlify и установите:
# Build command: npm run build
# Publish directory: ./
```

### На собственном хостинге

1. Скопируйте все файлы на сервер
2. Убедитесь, что включен HTTPS
3. Проверьте загрузку изображений
4. Тестируйте все ссылки

## Тестирование

### Перед запуском

- [ ] Обновлены все контакты
- [ ] Заменены изображения
- [ ] Обновлены отзывы
- [ ] Добавлены фото команды
- [ ] Настроена аналитика
- [ ] Проверены ссылки Telegram
- [ ] Lighthouse Score 90+ на мобильных
- [ ] Протестировано на iPhone и Android

### Инструменты

- **PageSpeed:** https://pagespeed.web.dev/
- **Lighthouse:** DevTools > Lighthouse
- **Schema Validator:** https://schema.org/docs/schema_org_in_action.html

## Поддержка и обновления

При возникновении проблем:

1. Проверьте консоль браузера (F12 > Console)
2. Убедитесь, что все изображения загружаются
3. Проверьте ссылки на Telegram
4. Очистите кэш браузера (Ctrl+Shift+Delete)

## Секурность

- ✅ Используйте HTTPS
- ✅ Обновляйте зависимости (npm update)
- ✅ Не коммитьте конфиденциальные данные
- ✅ Используйте переменные окружения для API ключей

---

**Последнее обновление:** 16 января 2026
