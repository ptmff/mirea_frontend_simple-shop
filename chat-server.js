// chat-server.js
const WebSocket = require('ws');
const url = require('url'); // для разбора query-параметров

const PORT = 5000;
const wss = new WebSocket.Server({ port: PORT });

// Счётчик для уникальных идентификаторов клиентов
let clientCounter = 0;

wss.on('connection', (ws, req) => {
  // Определяем роль из query-параметров (админ или клиент)
  const parameters = url.parse(req.url, true).query;
  const role = parameters.role === 'admin' ? 'admin' : 'client';
  ws.role = role;
  
  // Если это клиент, назначаем уникальный идентификатор
  if (ws.role === 'client') {
    clientCounter++;
    ws.clientId = clientCounter;
  }

  console.log(`Клиент подключился как ${role}${ws.clientId ? ' (Клиент #' + ws.clientId + ')' : ''}.`);

  ws.on('message', message => {
    const text = message.toString();

    if (ws.role === 'client') {
      // Формируем сообщение для администраторов с указанием номера клиента
      const adminMessage = `[Клиент #${ws.clientId}]: ${text}`;
      // Для самого клиента – можно отправлять сообщение без идентификатора
      const clientMessage = text; 

      // Отправляем подтверждение отправителю (без идентификатора)
      ws.send(clientMessage);

      // Отправляем сообщение всем подключённым админам
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.role === 'admin') {
          client.send(adminMessage);
        }
      });
    } else if (ws.role === 'admin') {
      // Сообщение от администратора: добавляем метку [Админ]
      const adminTaggedMessage = `[Админ]: ${text}`;
      // Рассылаем сообщение всем подключённым (и админам, и клиентам)
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(adminTaggedMessage);
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Клиент отключился.');
  });
});

console.log(`WebSocket сервер запущен на ws://localhost:${PORT}`);
