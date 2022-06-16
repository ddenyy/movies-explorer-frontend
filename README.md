# Movies-explorer-frontend

 Это полностью с нуля самостоятельный выпускной проект на курсе веб-разработки в Яндекс.Практикум.
 Главная страница содержит основную информацию о проекте и ссылки на контакты студента и Яндекс Практикума
 После регистрации и авторизации пользователю доступен сервис по поиску фильмов.


## [Сайт](https://deosmovies-explorer.nomoredomains.xyz/)

### :rocket: Установка и запуск проекта
*1. клонируйте репозиторий:*<br/>
`git clone https://github.com/ddenyy/movies-explorer-frontend`<br/>
*2. установите зависимости:*<br/>
 `npm install`<br/>
*3. запустите сервер:*<br/>
 `npm start`<br/>

## :point_right: Реализованные методы 

### Запросы к собственному API:
- проверка токена,
- авторизация с использованием localStorage,
- регистрация,
- получение и изменение данных пользователя
- добавление / удаление фильма в избранное.

### Запросы API к сервису beatfilm-movies:
- получение всех фильмов и сохранение их в localStorage,
- поиск фильма по ключевому слову,
- сортировка фильмов в зависимости от длительности.

### Роутинг:
- все роуты, кроме '/ ', 'sign-in', sign-out' защищены HOC-компонентом ProtectedRoute,
- при попытке перейти по защищенному роуту происходит редирект на главную страницу,
- после успешной авторизации происходит редирект на главную страницу

### Валидация форм:
- организована при помощи кастомного хука
- сделан специальный вывод ошибок под импутам и/или в всплывающее окно

### Общая функциональность:
- header изменяет состояние в зависимости от авторизации пользователя,
- на разрешении менее 768рх появляется гамбургер-меню,
- для хранения данных о пользователе использована глобальная стейт-переменная currentUser, созданная с помощью createContext,
- в компонент App внедрен контекст через CurrentUserContext.Provider,
- использованы хуки (useState, useEffect, useContext, useHistory),
- настроен прелоадер на запросы к API,
- кликом по карточке переводит на ютюб-трейлер фильма,
- настроено отражение фильмов по 3/2/1 карточки с кнопкой "еще" в зависимости от разрешения экрана,
- сделана микроанимация кнопок, ссылок и инпутов,
- разметка семантическая и портирована в JSX,
- все классы названы по БЭМ,
- вёрстка на Flex layout и/или Grid layout,
- сайт резиновый и адаптирован под рарешения: 1280, 1024, 768, 460 и 320рх.

### :eyeglasses: Технологии
- React
- JavaScript 
- CSS 
- Flexbox
- Grid layout
- JSX
- BEM 