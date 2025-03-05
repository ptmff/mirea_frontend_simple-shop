
# Online Shop Application

Это обновлённое приложение представляет собой интернет-магазин, состоящий из трех серверов и двух фронтендов – для покупателей и администраторов.

- **Catalog Server (порт 3000):**
  - Отдаёт статическую страницу `index.html`, на которой отображается каталог товаров.
  - Реализован GraphQL API для выборочного запроса данных о товарах (например, только названия и цены, или названия и описания).
  - На странице реализован чат поддержки через WebSocket.

- **Admin Server (порт 8080):**
  - Предоставляет RESTful API для панели администратора с возможностями:
    - Добавление товаров
    - Редактирование товара по ID
    - Удаление товара по ID
  - Отдаёт HTML-страницу `admin.html`, которая объединяет управление товарами и чат поддержки (тот же чат, что и в каталоге).

- **WebSocket Chat Server (порт 5000):**
  - Обеспечивает двустороннюю связь между покупателями и администраторами через чат поддержки.

---

## Структура проекта

```
online-shop/
├── README.md
├── API.md
├── data
│   └── products.json        // Данные о товарах
├── catalog
│   ├── package.json
│   ├── server.js            // Catalog Server с GraphQL API
│   └── public
│       └── index.html       // Фронтенд для покупателей (каталог + чат)
├── admin
│   ├── package.json
│   ├── server.js            // Admin Server с RESTful API
│   └── public
│       └── admin.html       // Панель администратора (управление товарами + чат)
└── chat-server.js           // WebSocket сервер для чата (порт 5000)
```

---

## Требования

- Node.js
- npm

---

## Инструкция по установке и запуску

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/ptmff/mirea_frontend_simple-shop
   cd mirea_frontend_simple-shop
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

   Панель администратора будет доступна по адресу [http://localhost:8080/admin.html](http://localhost:8080/admin.html).

4. **Запустите WebSocket Chat Server:**

   Откройте еще один терминал и выполните:

   ```bash
   node chat-server.js
   ```

   WebSocket сервер будет запущен на `ws://localhost:5000`.

5. **Доступ к интерфейсам:**
   - Фронтенд магазина: [http://localhost:3000](http://localhost:3000)
   - Панель администратора: [http://localhost:8080/admin.html](http://localhost:8080/admin.html)

---

## Примечание

- **Данные о товарах:** Файл `data/products.json` содержит пример товаров, распределённых по разным категориям.
- **GraphQL API:** Для тестирования запросов с выбором необходимых полей (например, названия и цены) можно использовать GraphiQL по адресу [http://localhost:3000/graphql](http://localhost:3000/graphql).
- **Чат поддержки:** Чат реализован через WebSocket и доступен как на стороне покупателей, так и в панели администратора.

---

Happy coding!
