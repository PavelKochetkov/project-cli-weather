# 🌤️ CLI Weather - Консольное приложение для прогноза погоды

Простое консольное приложение на Node.js для получения текущей погоды в любом городе мира через OpenWeatherMap API.

## ✨ Демонстрация работы

[![asciicast](https://asciinema.org/a/DYqs28OSR7SqAlCW.svg)](https://asciinema.org/a/DYqs28OSR7SqAlCW)

## ✨ Возможности

- 📍 Установка как одного города так и нескольких по умолчанию
- 🔑 Сохранение API-токена OpenWeatherMap
- 📖 Установка языка (русский или английский). По умолчанию - английский
- 🌡️ Получение текущей погоды с детальной информацией:
  - Температура (в °C)
  - Ощущаемая температура
  - Описание погоды с иконками
  - Влажность
  - Скорость ветра
- 🎨 Цветной вывод в консоли с помощью Chalk
- 💾 Локальное хранение настроек (город, токен и язык)

## 📦 Установка

### Предварительные требования
- Node.js версии 14 или выше
- npm или yarn
- API ключ от [OpenWeatherMap](https://openweathermap.org/api)

### Установка глобально (рекомендуется)

```bash
# Клонируйте репозиторий
git clone https://github.com/PavelKochetkov/project-cli-weather.git
cd project-cli-weather

# Установите зависимости
npm install

# Установите приложение глобально
npm link
```

Теперь команда `node weather` будет доступна из любой директории.

### Установка локально

```bash
# Клонируйте репозиторий
git clone https://github.com/PavelKochetkov/project-cli-weather.git
cd project-cli-weather

# Установите зависимости
npm install

# Запускайте через node
node weather.js [параметры]
```

## 🔧 Использование

### Получение API-ключа
1. Зарегистрируйтесь на [OpenWeatherMap](https://openweathermap.org/api)
2. Получите бесплатный API ключ в разделе [API Keys](https://home.openweathermap.org/api_keys)
3. Сохраните ключ с помощью команды:

```bash
node weather.js -t YOUR_API_KEY
```

### Установка города по умолчанию

```bash
node weather.js -s Москва - установка одного города
node weather.js -s Москва -s Лондон -s Киров и т.д. - установка нескольких городов
```

### Получение прогноза погоды

```bash
# Без параметров - показывает погоду для установленного города
node weather.js

# Или можно указать город через переменную окружения
CITY=Лондон node weather.js
```

### Просмотр справки

```bash
node weather.js -h
```

Вывод справки:
```
HELP
 Без параметров - вывод погоды
-s [CITY] для установки города
-h для вывода помощи
-t [API_KEY] для сохранения токена
```

## 📝 Примеры использования

```bash
# Сохраняем API ключ
node weather.js -t 1234567890abcdef1234567890abcdef

# Устанавливаем город по умолчанию
node weather.js -s Санкт-Петербург

# Получаем погоду
node weather.js
```

Пример вывода:
```
WEATHER Погода в городе Санкт-Петербург
 ☁️  облачно с прояснениями
 Температура: 12.5 (ощущается как 10.8)
 Влажность: 78%
 Скорость ветра: 4.2
```

## 🏗️ Структура проекта

```
project-cli-weather/
├── weather.js              # Основной файл приложения
├── package.json           # Конфигурация npm
├── package-lock.json      # Фиксация версий зависимостей
├── helpers/
│   └── args_helper.js    # Парсер аргументов командной строки
└── services/
    ├── api.service.js    # Работа с OpenWeatherMap API
    ├── log.service.js    # Логирование и цветной вывод
    └── storage.service.js # Хранение настроек в файле
```

## 🔌 Зависимости

- **axios** ^1.16.0 - HTTP-клиент для запросов к API
- **chalk** ^5.6.2 - Цветной вывод в консоль
- **dedent-js** ^1.0.1 - Удаление лишних отступов в многострочных строках

## 📁 Хранение данных

Приложение сохраняет настройки в файл `weather-data.json` в домашней директории пользователя:
- Windows: `C:\Users\<username>\weather-data.json`
- Linux/macOS: `~/weather-data.json`

Файл содержит:
```json
{
  "token": "ваш_api_ключ",
  "city": "название_города"
}
```

## 🐛 Отладка

Если возникают ошибки:

1. **"Не задан ключ API"** - сохраните API ключ командой `weather -t YOUR_KEY`
2. **"Неверно указан город"** - проверьте правильность написания города
3. **"Неверно указан токен"** - проверьте API ключ на [OpenWeatherMap](https://openweathermap.org/api)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 👤 Автор

**Pavel Kochetkov**
- GitHub: [@PavelKochetkov](https://github.com/PavelKochetkov)
- Telegram: [@PavelKochetkov](https://t.me/PKochetkov)