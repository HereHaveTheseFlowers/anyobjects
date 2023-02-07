

# <p align="center">∀ny objects</p>
<p align="center">
  <a href="https://github.com/herehavetheseflowers/anyobjects/blob/main/README.md">Русский</a> |
  <span>English</span>
</p>

Curated project about Russian production. We have created an archive of objects that we found beautiful.

![Google Chrome - Light](https://user-images.githubusercontent.com/106176669/217242972-85fe36a9-5d42-4c78-8ca6-16b98464690d.png)

## 🌐 Deploy

http://anyobjects.ru

## ⚙️ How it works

This is a single page React web application that uses custom-written store and event-bus and works as an archive of objects sold online.
Currently the objects are stored on the server. An admin can access a special page by going to anyobjects.ru/admin and entering login and password. There he can alter all the existing objects and add new ones easily via a simple form.

More than that, any user can submit an object they like via a form and that request gets sent to our email adress.

React lets us render new content dynamically with no page refreshing. All the styles are written via BEM architecture. Babel + core-js insure we are supported on all of the browsers we want to be supported, and webpack optimizes the files.

## 🦾 Stack

 - Typescript
 - React
 - Webpack
 - Sass, PostCSS
 - Babel and core-js

## 📜 Scripts

Use this to start the app locally on your machine:

Building:
```
npm run build
```
Running:
```
npm run start
```
Developing:
```
npm run dev
```
