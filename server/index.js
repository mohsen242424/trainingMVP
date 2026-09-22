require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const db = require('./db/database');

const authRoutes = require('./routes/auth');
const positionsRoutes = require('./routes/positions');
const applicationsRoutes = require('./routes/applications');
const tasksRoutes = require('./routes/tasks');
const submissionsRoutes = require('./routes/submissions');
const messagesRoutes = require('./routes/messages');
const meetingsRoutes = require('./routes/meetings');
const notificationsRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');
const aiRoutes = require('./routes/ai');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', authRoutes);
app.use('/api/positions', positionsRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/meetings', meetingsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ai', aiRoutes);

app.use(errorHandler);

const userSockets = new Map();

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    userSockets.set(userId, socket.id);
  });

  socket.on('send_message', (data) => {
    const recipientSocket = userSockets.get(data.to_user_id);
    if (recipientSocket) {
      io.to(recipientSocket).emit('receive_message', data);
    }
  });

  socket.on('typing', (data) => {
    const recipientSocket = userSockets.get(data.to_user_id);
    if (recipientSocket) {
      io.to(recipientSocket).emit('typing', data);
    }
  });

  socket.on('mark_read', () => {});

  socket.on('disconnect', () => {
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
