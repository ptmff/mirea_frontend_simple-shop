// catalog/server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

// Подключаем GraphQL
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 3000;

// Статическая выдача файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Определяем GraphQL схему
const schema = buildSchema(`
  type Product {
    id: ID!
    name: String
    price: Float
    description: String
    categories: [String]
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }
`);

// Функция чтения товаров из JSON-файла
function readProducts() {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Ошибка чтения products.json:", err);
    return [];
  }
}

// Резолверы для GraphQL
const root = {
  products: () => {
    return readProducts();
  },
  product: ({ id }) => {
    const products = readProducts();
    return products.find(p => p.id == id);
  }
};

// GraphQL эндпоинт
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true  // Для отладки через GraphiQL в браузере
}));

// Оставляем REST API для каталога (если требуется)
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Catalog server запущен на http://localhost:${PORT}`);
});
