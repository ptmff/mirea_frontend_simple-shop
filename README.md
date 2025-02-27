# Online Shop Application

Это приложение представляет собой интернет-магазин, состоящий из двух бэкенд-серверов и простого фронтенда.

- **Catalog Server (порт 3000)**: Отдаёт статическую страницу `index.html`, на которой отображается каталог товаров. Данные о товарах подтягиваются из файла `data/products.json`.
- **Admin Server (порт 8080)**: Реализует API для панели администратора с возможностями:
  - Добавление товаров
  - Редактирование товара по ID
  - Удаление товара по ID
  
  Также сервер отдаёт простую HTML-страницу `admin.html` с формами для тестирования API.

## Структура проекта

```
online-shop/
├── README.md
├── API.md
├── data
│   └── products.json
├── catalog
│   ├── package.json
│   ├── server.js
│   └── public
│       └── index.html
└── admin
    ├── package.json
    ├── server.js
    └── public
        └── admin.html
```

## Требования

- Node.js
- npm

## Инструкция по установке и запуску

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/yourusername/online-shop.git
   cd online-shop
   ```

2. **Запустите Catalog Server:**

   ```bash
   cd catalog
   npm install
   npm start
   ```

   Сервер будет запущен на [http://localhost:3000](http://localhost:3000).

3. **Запустите Admin Server:**

   Откройте новый терминал и выполните:
   
   ```bash
   cd admin
   npm install
   npm start
   ```

   Сервер будет запущен на [http://localhost:8080](http://localhost:8080).

4. **Доступ к интерфейсам:**
   - Фронтенд магазина: [http://localhost:3000](http://localhost:3000)
   - Панель администратора: [http://localhost:8080/admin.html](http://localhost:8080/admin)

## Примечание

Файл с данными `data/products.json` содержит 5 примеров товаров, распределённых по минимум двум категориям (один товар находится сразу в двух категориях).

---

Happy coding!