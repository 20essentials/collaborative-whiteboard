import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Variables para obtener el dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

function onConnection(socket) {
  socket.on('drawing', data => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

httpServer.listen(port, () => console.log(`Open in http://localhost:${port}`));
