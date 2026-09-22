const express = require('express');
const db = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.get('/my-tasks', (req, res) => {
  try {
    const app = db.prepare('SELECT id FROM applications WHERE student_id = ?').get(req.user.id);
    if (!app) return res.json({ success: true, data: [] });
    
    const tasks = db.prepare(`
      SELECT t.*, s.status as submission_status
      FROM tasks t
      LEFT JOIN submissions s ON t.id = s.task_id
      WHERE t.application_id = ?
      ORDER BY t.order_index ASC
    `).all(app.id);
    
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
