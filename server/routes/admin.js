const express = require('express');
const db = require('../db/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken, requireRole('admin'));

router.get('/stats', (req, res) => {
  try {
    const totalUsers = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
    const totalStudents = db.prepare("SELECT COUNT(*) as c FROM users WHERE role = 'student'").get().c;
    const totalApplications = db.prepare('SELECT COUNT(*) as c FROM applications').get().c;
    const pendingApplications = db.prepare("SELECT COUNT(*) as c FROM applications WHERE status = 'pending'").get().c;
    const acceptedApplications = db.prepare("SELECT COUNT(*) as c FROM applications WHERE status = 'accepted'").get().c;
    const rejectedApplications = db.prepare("SELECT COUNT(*) as c FROM applications WHERE status = 'rejected'").get().c;
    
    res.json({
      success: true,
      data: {
        totalUsers, totalStudents, totalApplications,
        pendingApplications, acceptedApplications, rejectedApplications,
        activeInterns: acceptedApplications, // simplified
        completedInterns: 0 // simplified
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/users', (req, res) => {
  try {
    const { q, role } = req.query;
    let query = 'SELECT id, name, email, role, university, major, study_year, language, avatar_url, is_active, created_at FROM users WHERE 1=1';
    const params = [];
    
    if (q) {
      query += ' AND (name LIKE ? OR email LIKE ?)';
      params.push(`%\${q}%`, `%\${q}%`);
    }
    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }
    
    const users = db.prepare(query).all(...params);
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/users/:id', (req, res) => {
  try {
    const { is_active, role } = req.body;
    if (is_active !== undefined) {
      db.prepare('UPDATE users SET is_active = ? WHERE id = ?').run(is_active ? 1 : 0, req.params.id);
    }
    if (role) {
      db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, req.params.id);
    }
    res.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/positions', (req, res) => {
  try {
    const positions = db.prepare('SELECT * FROM positions ORDER BY order_index ASC').all();
    res.json({ success: true, data: positions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/positions/:id', (req, res) => {
  try {
    const { is_available } = req.body;
    db.prepare('UPDATE positions SET is_available = ? WHERE id = ?').run(is_available ? 1 : 0, req.params.id);
    res.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
