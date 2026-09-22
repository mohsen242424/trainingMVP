const express = require('express');
const db = require('../db/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.get('/', (req, res) => {
  try {
    let query = `
      SELECT m.*, u.name as other_party_name
      FROM meetings m
    `;
    const params = [];
    
    if (req.user.role === 'supervisor') {
      query += ' JOIN users u ON m.student_id = u.id WHERE m.supervisor_id = ?';
      params.push(req.user.id);
    } else if (req.user.role === 'student') {
      query += ' JOIN users u ON m.supervisor_id = u.id WHERE m.student_id = ?';
      params.push(req.user.id);
    } else {
      query += ' JOIN users u ON m.student_id = u.id'; // admin sees all with student name
    }
    
    query += ' ORDER BY m.scheduled_at ASC';
    const meetings = db.prepare(query).all(...params);
    
    res.json({ success: true, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', requireRole('supervisor'), (req, res) => {
  try {
    const { student_id, application_id, title, scheduled_at, duration_minutes, meeting_link, notes } = req.body;
    
    const info = db.prepare(`
      INSERT INTO meetings (supervisor_id, student_id, application_id, title, scheduled_at, duration_minutes, meeting_link, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(req.user.id, student_id, application_id || null, title, scheduled_at, duration_minutes, meeting_link, notes);
    
    db.prepare("INSERT INTO notifications (user_id, type, title_ar, body_ar, related_id) VALUES (?, 'meeting_scheduled', 'اجتماع جديد', 'تمت جدولة اجتماع جديد معك', ?)").run(student_id, info.lastInsertRowid);
    
    res.json({ success: true, data: { id: info.lastInsertRowid } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/:id', (req, res) => {
  try {
    const { status, notes } = req.body;
    db.prepare('UPDATE meetings SET status = COALESCE(?, status), notes = COALESCE(?, notes) WHERE id = ?').run(status, notes, req.params.id);
    res.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
