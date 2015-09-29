# Telegram
Оглавление:
- [Как работают боты](#Как-работают-боты)
- [Как завести бота](#Как-завести-бота)
- [Как начать получать сообщения ботом](#Как-начать-получать-сообщения-ботом)
- [Документация](#Документация)
- [Пример бота](#Пример-бота)
- [Некоторые источники данных](#Некоторые-источники-данных)

## Как работают боты
- код бота исполняется на вашем сервере
- бот общается с сервером Telegram по http + json
- первое сообщение должен отправить пользователь
- бота можно пригласить в группу

## Как завести бота
- написать боту [@BotFather](https://telegram.me/botfather) сообщение `/newbot`
- задать отображаемое имя нового бота
- задать логин бота (должен оканчиваться на `bot`, регистр не важен)
- сохранить полученный токен

## Как начать получать сообщения ботом
- адрес всех [методов](https://core.telegram.org/bots/api#available-methods) `https://api.telegram.org/bot<token>/METHOD_NAME`
- передавать параметры в url или json (application/json)
- ответ в json

### `/getMe`
Вернет боту информацию о самом себе
```
{
    "ok": true,
    "result": {
        "id": 1234567890,
        "first_name": "Example Bot",
        "username": "example_bot"
    }
}
```

### `/getUpdates?offset=K&limit=N&timeout=T`
Вернет боту список непрочитанных событий
- начиная с события `K` (сервер станет считать, что события менее K прочитаны),
- в количестве максимум `N` элементов,
- с long polling таймаутом `T`.
```
{
    "ok": true,
    "result": [
        {
            "update_id": 1234567890,
            "message": {
                "message_id": 77,
                "from": {
                    "id": 12345,
                    "first_name": "Vitaliy",
                    "last_name": "Meshchaninov",
                    "username": "glukki"
                },
                "chat": {
                    "id": 123456789,
                    "first_name": "Vitaliy",
                    "last_name": "Meshchaninov",
                    "username": "glukki"
                },
                "date": 1442074306,
                "text": "test"
            }
        }
    ]
}
```

## `/sendMessage?chat_id=ID&text=TEXT`
Отправляет сообщение пользователю.
```
{
  "ok": true,
  "result": {
    "message_id": 37,
    "from": {
      "id": 1234567890,
      "first_name": "Example Bot",
      "username": "example_bot"
    },
    "chat": {
      "id": 1234567891,
      "first_name": "glukki",
      "last_name": "",
      "username": "glukki"
    },
    "date": 1437595975,
    "text": "Hello world!"
  }
}
```

## Документация
- [Введение в Telegram Bots](https://core.telegram.org/bots) — общая информация о возможностях ботов
- [Telegram Bot API](https://core.telegram.org/bots/api) — подробная документация по API
- [Модуль request](https://www.npmjs.com/package/request) — для простого осуществления http-запросов

## Пример бота
1. скачать файлы [`index.js`](#file-index-js) и [`package.json`](#file-package-json) в отдельную директорию;
2. подставить в `index.js` токен своего бота в переменную `TOKEN`;
3. в директории с файлами выполнить `npm install` (установит модули указанные в `package.json`);
4. запустить бота командой `npm start` или `npm watch` (будет перезапускать бота при изменении кода).

# Некоторые источники данных
#### Погода по городу/координатам
http://openweathermap.org/api
```
http://api.openweathermap.org/data/2.5/weather?lat=59.955800&lon=30.328257
```

#### Город по координатам
https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding
```
https://maps.googleapis.com/maps/api/geocode/json?latlng=59.955800,30.328257
```

#### Часовой пояс по координатам
https://developers.google.com/maps/documentation/timezone/intro
```
https://maps.googleapis.com/maps/api/timezone/json?location=59.955800,30.328257&timestamp=1443344339
```

#### Рандомная картинка с котиком
http://random.cat
```
http://random.cat/meow
```

#### Открытые issue github репозитория
https://developer.github.com/v3/issues/
```
https://api.github.com/repos/nodeschool/spb/issues?sort=created&state=open
```

#### Ближайшие кафе к координатам
https://developers.google.com/places/web-service/search
```
https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=59.955800,30.328257&radius=500&key=XXX
```

#### Последние твиты аккаунта
Требует регистрации  
https://dev.twitter.com/rest/reference/get/statuses/user_timeline

