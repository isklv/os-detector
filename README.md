# os-detector

Легкий детектор ОС клиента — **~1.4 KB gzipped**, ноль зависимостей.

Определяет iOS, Android, Windows, macOS, Linux, ChromeOS. Вешает `data-os` на `<html>` — дальше показывай контент через CSS или JS.

## Проблема

У вас один welcome-лендинг, но разный контент для iPhone и Android. До этого — дублируете страницы. Теперь — один скрипт, условный контент.

## Установка

Один файл:

```html
<script src="os-detector.js"></script>
```

## CSS (основной способ)

Скрипт вешает атрибуты на `<html>`:

```html
<html data-os="ios" data-platform="apple" data-device="phone" data-os-version="17_4">
```

Показывайте контент через CSS:

```css
/* Скрыть всё по умолчанию */
.os-ios, .os-android { display: none; }

/* Показать нужное */
[data-os="ios"] .os-ios { display: block; }
[data-os="android"] .os-android { display: block; }
```

```html
<div class="os-ios">
  <a href="appstore://...">Скачать в App Store</a>
</div>

<div class="os-android">
  <a href="market://...">Скачать в Google Play</a>
</div>
```

## JS API

```js
// Быстрая проверка
OSDetect.is('ios')       // true/false
OSDetect.is('android')   // true/false

// Шорткаты
OSDetect.isIOS()
OSDetect.isAndroid()
OSDetect.isWindows()
OSDetect.isMacOS()
OSDetect.isLinux()
OSDetect.isMobile()
OSDetect.isTablet()
OSDetect.isApple()

// Полная информация
OSDetect.info
// {
//   os: 'ios',
//   device: 'iphone',
//   platform: 'apple',
//   version: '17.4'
// }
```

## Поддерживаемые ОС

| ОС | `data-os` | Детали |
|---|---|---|
| iOS | `ios` | iPhone, iPad, iPod (iPadOS 13+ через touch detection) |
| Android | `android` | phone / tablet |
| Windows | `windows` | desktop / phone |
| macOS | `macos` | desktop |
| Linux | `linux` | desktop |
| ChromeOS | `chromeos` | desktop |

## Пример: welcome-лендинг

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <script src="os-detector.js"><\/script>
  <style>
    .app-btn { display: none; }
    [data-os="ios"] .app-ios { display: inline-block; }
    [data-os="android"] .app-android { display: inline-block; }
  </style>
</head>
<body>
  <h1>Получите карту — скачайте приложение</h1>

  <button class="app-btn app-ios" onclick="location.href='https://apps.apple.com/...'">
    🍎 App Store
  </button>

  <button class="app-btn app-android" onclick="location.href='https://play.google.com/...'">
    🤖 Google Play
  </button>
</body>
</html>
```

## Build

```bash
npm run build   # → dist/os-detector.js
```

## License

MIT
