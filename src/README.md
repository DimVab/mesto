# Проект 4: Место

## Обзор
Данный проект выполнен как практическое задание в курсе освоения "JavaScript: непростые концепции" профессии Веб-разработчик.

Проект представляет из себя одностраничный сайт с фотографиямии различных мест. В нём размещены 6 фотографий с подписями. Реализованы следующие возможности:
* редактирование профиля
* редактирование аватара
* добавление и удаление картинок
* возможность поставить и убрать лайк
* открытие картинки в полном размере
* закрытие картинки кнопкой клавиатуры "Esc"
* закрытие картинки кликом за пределами попапа
* валидация полей ввода попапов

## Используемые технологии
В проекте используются такие технологии, как:
* flexbox;
* grid;
* отзывчивая вёрстка (адаптивная + резиновая);
* JavaScript (код написан по ООП)
* Webpack
* реализовано взаимодействие с сервером через API: данные о фотографиях и пользователе загружаются с сервера

### Другие особенности
1. Для работы с макетом использовался инструмент **Figma**
2. Файловая структура организована по правилам **Nested БЭМ**
3. Используемый шрифт - *"Inter"*
4. Изображения сжаты при помощи сервиса **TinyPNG**

### Адаптивная вёрстка
Проект адаптирован преимущественно для устройств с шириной экранов:
* 1280px
* 768px
* 320px

Контрольные точки перехода сделаны на ширинах 1280px, 1024px и 620px. В промежутках между ними используется резиновая вёрстка

### Системные требования
Из-за использования технологии построения сетки Grid проект некоректно отображается в браузере Internet Explorer

**Ссылка на проект:**
https://dimvab.github.io/mesto/
