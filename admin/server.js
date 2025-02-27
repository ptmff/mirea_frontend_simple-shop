const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
const dataPath = path.join(__dirname, '..', 'data', 'products.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Отдаем статику из каталога public (включая admin.html)
app.use(express.static(path.join(__dirname, 'public')));

// Вспомогательные функции для работы с данными
function readProducts() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Ошибка чтения products.json:", err);
    return [];
  }
}

function writeProducts(products) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
}

// GET /api/products - получить список товаров
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// POST /api/products - добавить один или несколько товаров
app.post('/api/products', (req, res) => {
  let newProducts = req.body;
  if (!Array.isArray(newProducts)) {
    newProducts = [newProducts];
  }
  
  let products = readProducts();
  newProducts.forEach(prod => {
    // Назначаем новый ID
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, ...prod };
    products.push(newProduct);
  });
  
  writeProducts(products);
  res.json({ message: "Товар(ы) успешно добавлен(ы)", products: newProducts });
});

// PUT /api/products/:id - обновление товара по ID
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  let products = readProducts();
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) {
    return res.status(404).json({ error: "Товар не найден" });
  }
  
  products[index] = { ...products[index], ...req.body };
  writeProducts(products);
  res.json({ message: "Товар успешно обновлён", product: products[index] });
});

// DELETE /api/products/:id - удаление товара по ID
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  let products = readProducts();
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) {
    return res.status(404).json({ error: "Товар не найден" });
  }
  
  products.splice(index, 1);
  writeProducts(products);
  res.json({ message: "Товар успешно удалён" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Admin server запущен на http://localhost:${PORT}`);
});
