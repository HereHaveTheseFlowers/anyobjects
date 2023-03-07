
# <p align="center">∀ ну</p>
<p align="center">
  <span>Русский</span> |
  <a href="https://github.com/herehavetheseflowers/anyobjects/blob/main/README.en.md">English</a>
</p>

Кураторский проект про российское производство. Мы создаём архив объектов, в которых находим красивое исполнение.

![Google Chrome - Light](https://user-images.githubusercontent.com/106176669/217242872-58d22ab9-5da8-4b39-84e5-8a575016faa9.png)


## 🌐 Адрес

https://anyobjects.ru

## ⚙️ Как всё работает

Ану - это построенное на React одностраничное приложение, которое работает как хранилище объектов, продаваемых онлайн, и использует само-писанные Store и Event Bus.
В данный момент все объекты хранятся на сервере. Админ может получить доступ к специальной странице, зайдя на anyobjects.ru/admin и введя административные логин и пароль. Там он(а) может изменить любые существующие объекты, или добавить новые с помощью простой формы.

Более того, любой пользователь может предложить нам объект через форму на сайте, и его/её предложение автоматически отправится нам на почту.

Реакт позволяет рендерить новый контент динамически, не тратя время пользователя на перезагрузку страницы. Все стили написаны в методологии БЭМ. Babel и Core-js помогают нам с поддержкой старых браузеров, а Webpack оптимизирует и сжимает файлы.

![anydrop](https://user-images.githubusercontent.com/106176669/223543129-28cb6ccc-b47a-4683-adae-d5087a97bbb6.jpg)

## 🦾 Использованные технологии

 - Typescript
 - React
 - Webpack
 - Sass, PostCSS
 - Babel и core-js

## 📜 Скрипты

Используйте их, чтобы запустить наше приложение у себя локально:

Билд:
```
npm run build
```
Запуск:
```
npm run start
```
Разработка:
```
npm run dev
```
