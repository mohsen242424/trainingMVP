const express = require('express');
const db = require('../db/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.post('/', requireRole('student'), (req, res) => {
  try {
    const { task_id, submitted_text, submitted_file_url } = req.body;
    
    const info = db.prepare(`
      INSERT INTO submissions (task_id, student_id, submitted_text, submitted_file_url)
      VALUES (?, ?, ?, ?)
    `).run(task_id, req.user.id, submitted_text, submitted_file_url);
    
    const task = db.prepare('SELECT application_id FROM tasks WHERE id = ?').get(task_id);
    if (task) {
      const supervisors = db.prepare("SELECT id FROM users WHERE role = 'supervisor'").all();
      const insertNotif = db.prepare(`
        INSERT INTO notifications (user_id, type, title_ar, body_ar, related_id)
        VALUES (?, 'submission_received', 'تسليم جديد', 'تم استلام مهمة جديدة', ?)
      `);
      supervisors.forEach(sup => insertNotif.run(sup.id, task.application_id));
    }
    
    res.json({ success: true, data: { id: info.lastInsertRowid } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:taskId', (req, res) => {
  try {
    const submission = db.prepare('SELECT * FROM submissions WHERE task_id = ?').get(req.params.taskId);
    if (!submission) return res.json({ success: true, data: null });
    res.json({ success: true, data: submission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/:id', requireRole('supervisor'), (req, res) => {
  try {
    const { supervisor_feedback, score } = req.body;
    
    const sub = db.prepare('SELECT * FROM submissions WHERE id = ?').get(req.params.id);
    if (!sub) return res.status(404).json({ success: false, message: 'Not found' });
    
    db.prepare(`
      UPDATE submissions SET supervisor_feedback = ?, score = ?, status = 'supervisor_reviewed', reviewed_at = datetime('now')
      WHERE id = ?
    `).run(supervisor_feedback, score, req.params.id);
    
    db.prepare("INSERT INTO notifications (user_id, type, title_ar, body_ar, related_id) VALUES (?, 'submission_reviewed', 'تقييم جديد', 'تم تقييم مهمتك', ?)").run(sub.student_id, sub.task_id);
    
    res.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
