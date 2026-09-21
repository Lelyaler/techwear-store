# TECHWEAR // OS

Интерактивный PWA веб-магазин модульной одежды и кибер-экипировки, выполненный в эстетике темного милитари-киберпанка.

[Live Demo](https://lelyaler.github.io/techwear-store/)

---

## О проекте

TECHWEAR // OS объединяет концепт футуристичного интернет-магазина и интерактивные веб-инструменты:
- **Modular Belt System (MBS) Builder** — визуальный конфигуратор снаряжения с анатомическим манекеном, слотами экипировки и экспортом конфигурации через URL.
- **Cyber-Fit Scanner** — биометрический калькулятор размеров одежды, обуви и перчаток с адаптивным подбором под крой изделий.
- **Web Audio API Engine** — процедурный аудио-синтезатор: процедурные звуковые сигналы интерфейса и низкочастотный фоновый эмбиент без загрузки внешних аудиофайлов.
- **Military Checkout Terminal** — CLI-терминал оформления заказа с симуляцией логистического радара на HTML5 Canvas и расчетом доставки автономными дронами.
- **Neural ID Profile** — профиль пользователя с выбором тактической фракции, консольной мини-игрой по дешифровке промокодов и начислением кредитов.
- **N.E.O.N. Cortex** — встроенный киберпанк-ассистент поддержки.
- **Multi-Theme Engine** — переключение между 4 цветовыми профилями (`Stealth Default`, `Cyber`, `Green Tactical`, `Alert Pink`).
- **PWA Ready** — офлайн-кэширование через Service Worker (`sw.js`) и установка на домашний экран мобильных устройств.

---

## Стек технологий

- **Frontend:** Vanilla JavaScript (ES Modules, компонентная структура)
- **Стили:** CSS Custom Properties, BEM-нотация, Hardware-accelerated CSS 3D Transforms
- **Графика:** Canvas 2D API, WebP-оптимизация медиаресурсов
- **Звук:** Web Audio API (OscillatorNode, BiquadFilterNode, GainNode)
- **Сборщик:** Vite 8
- **PWA:** Service Worker (App Shell Cache), Web App Manifest

---

## Быстрый старт

### Требования
- Node.js (v18 или новее)
- npm / pnpm / yarn

### Установка и запуск

1. Клонировать репозиторий:
```bash
git clone https://github.com/Lelyaler/techwear-store.git
cd techwear-store
```

2. Установить зависимости:
```bash
npm install
```

3. Запустить локальный сервер разработки:
```bash
npm run dev
```

4. Собрать продакшн-версию:
```bash
npm run build
```

5. Локальный предпросмотр сборки:
```bash
npm run preview
```

### Деплой на GitHub Pages
```bash
npm run deploy
```
