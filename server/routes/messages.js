const express = require('express');
const db = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.get('/conversations/list', (req, res) => {
  try {
    const userId = req.user.id;
    // Get unique users that current user has communicated with
    const conversations = db.prepare(`
      SELECT u.id, u.name, u.role, u.avatar_url,
             (SELECT content FROM messages WHERE (from_user_id = u.id AND to_user_id = ?) OR (from_user_id = ? AND to_user_id = u.id) ORDER BY sent_at DESC LIMIT 1) as last_message,
             (SELECT COUNT(*) FROM messages WHERE from_user_id = u.id AND to_user_id = ? AND is_read = 0) as unread_count
      FROM users u
      WHERE u.id IN (SELECT from_user_id FROM messages WHERE to_user_id = ?)
         OR u.id IN (SELECT to_user_id FROM messages WHERE from_user_id = ?)
    `).all(userId, userId, userId, userId, userId);
    
    res.json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    
    const messages = db.prepare(`
      SELECT * FROM messages 
      WHERE (from_user_id = ? AND to_user_id = ?) OR (from_user_id = ? AND to_user_id = ?)
      ORDER BY sent_at ASC
    `).all(currentUserId, userId, userId, currentUserId);
    
    // Mark as read
    db.prepare('UPDATE messages SET is_read = 1 WHERE from_user_id = ? AND to_user_id = ?').run(userId, currentUserId);
    
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { to_user_id, content } = req.body;
    
    const info = db.prepare(`
      INSERT INTO messages (from_user_id, to_user_id, content) VALUES (?, ?, ?)
    `).run(req.user.id, to_user_id, content);
    
    db.prepare("INSERT INTO notifications (user_id, type, title_ar, body_ar, related_id) VALUES (?, 'new_message', 'رسالة جديدة', 'لديك رسالة جديدة', ?)").run(to_user_id, req.user.id);
    
    res.json({ success: true, data: { id: info.lastInsertRowid } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
