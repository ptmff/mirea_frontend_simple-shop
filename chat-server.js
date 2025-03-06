// chat-server.js
const WebSocket = require('ws');
const url = require('url'); // Для разбора query-параметров

const PORT = 5000;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws, req) => {
  // Определяем роль из query-параметров
  const parameters = url.parse(req.url, true).query;
  const role = parameters.role === 'admin' ? 'admin' : 'client';
  ws.role = role;

  console.log(`Клиент подключился как ${role}.`);

  ws.on('message', message => {
    const text = message.toString();
    // Добавляем метку к сообщению
    const label = ws.role === 'admin' ? '[Админ]' : '[Клиент]';
    const taggedMessage = `${label}: ${text}`;
    console.log('Получено сообщение:', taggedMessage);

    if (ws.role === 'client') {
      // Если сообщение от клиента, отправляем только обратно этому клиенту и всем админам
      ws.send(taggedMessage);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.role === 'admin') {
          client.send(taggedMessage);
        }
      });
    } else if (ws.role === 'admin') {
      // Если сообщение от админа, рассылаем всем подключённым клиентам (админам и клиентам)
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(taggedMessage);
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Клиент отключился.');
  });
});

console.log(`WebSocket сервер запущен на ws://localhost:${PORT}`);
