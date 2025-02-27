const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Отдаем статику из каталога public
app.use(express.static(path.join(__dirname, 'public')));

// API эндпоинт для получения списка товаров
app.get('/api/products', (req, res) => {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Ошибка чтения products.json:", err);
      return res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
    res.json(JSON.parse(data));
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Catalog server запущен на http://localhost:${PORT}`);
});
