# GalleryApp

Привет! Меня зовут Серик, и это мой проект для технического теста nFactorial.

---

## Основные возможности

- Загрузка изображений с компьютера
- Генерация картинок с помощью ИИ (на основе текстового запроса)
- Добавление хэштегов
- Поиск по хэштегам
- Фильтрация: Все фото, Избранные, Сгенерированные
- Лайки (избранное)
- Скачивание сгенерированных изображений
- Авторизация через Google
- Хранение данных локально через IndexedDB (Dexie)

---

## Реализовано

- [x] Главная страница с приветственным оформлением
- [x] Галерея с сеткой изображений
- [x] Собственный API (`/api/generate`) для генерации изображений
- [x] Поиск по хэштегу
- [x] Авторизация через Firebase Auth
- [x] Публичный доступ через [Vercel](https://vercel.com)
- [x] Локальная база данных (IndexedDB через Dexie.js)

#
---

## Технологии

| Категория       | Технологии                                     |
|----------------|------------------------------------------------|
| Frontend       | React, Tailwind CSS, Vite, React Router        |
| Backend API    | Node.js (Vercel handler)                       |
| Генерация       | Pollinations API                               |
| База данных    | IndexedDB (Dexie.js)                           |
| Авторизация    | Firebase                                   |
| Хостинг        | Vercel                                         |

---

## Как запустить локально

### Frontend

```bash
npm install
npm run dev
```
### Backend 
```
cd server
node index.mjs
```
Сайт доступен по ссылке:

https://gallery-app-tawny.vercel.app (https://gallery-app-tawny.vercel.app/)

---
# Процесс разработки

### Проект я реализовывал поэтапно:
```
 • 1 день: Интерфейс галереи, сетка изображений, фильтры.
 • 2 день: Интеграция AI генерации изображений через Pollinations API.
 • 3 день: Локальное хранение изображений и избранного через IndexedDB (Dexie.js).
 • 4 день: Firebase авторизация через Google.
 • 5 день: Поиск по хэштегам, деплой на Vercel.
```
### Компромиссы и вызовы
 - Многие современные AI-сервисы для генерации изображений (например, MidJourney или Replicate) оказались платными или требовали сложной настройки. Поэтому я выбрал Pollinations API — он бесплатный и сразу готов к использованию.
 - Для хранения данных изначально рассматривался MongoDB, но был сделан выбор в пользу Dexie.js, чтобы сделать приложение доступным даже без интернета.
 - Во время деплоя возникли трудности с GitHub Push Protection и ошибками из-за .env, поэтому я перезапускал репозиторий и очищал историю коммитов.
 - Авторизация Google через Firebase не работала до тех пор, пока вручную не добавил домен Vercel в список разрешённых.
 - Генерация изображений работает только в production — локально доступ к внешнему API был ограничен.

---
# Спасибо за внимание!

### Контакты
 • GitHub: https://github.com/absadykov05 \
 • Telegram: https://t.me/absadykov4

#
