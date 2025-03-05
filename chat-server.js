// chat-server.js
const WebSocket = require('ws');

const PORT = 5000;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  console.log('Клиент подключился.');

  ws.on('message', message => {
    // Преобразуем Buffer или бинарные данные в строку
    const text = message.toString();
    console.log('Получено сообщение:', text);
    // Рассылаем сообщение всем подключённым клиентам как строку
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });
  

  ws.on('close', () => {
    console.log('Клиент отключился.');
  });
});

console.log(`WebSocket сервер запущен на ws://localhost:${PORT}`);
