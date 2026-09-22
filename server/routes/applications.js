const express = require('express');
const db = require('../db/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.post('/', requireRole('student'), (req, res) => {
  try {
    const { position_id, cv_text, cv_file_url, answers, linkedin_url } = req.body;
    
    const info = db.prepare(`
      INSERT INTO applications (student_id, position_id, cv_text, cv_file_url, answers)
      VALUES (?, ?, ?, ?, ?)
    `).run(req.user.id, position_id, cv_text, cv_file_url, answers);
    
    // Notify supervisors
    const supervisors = db.prepare("SELECT id FROM users WHERE role = 'supervisor'").all();
    const insertNotif = db.prepare(`
      INSERT INTO notifications (user_id, type, title_ar, body_ar, related_id)
      VALUES (?, 'application_submitted', 'طلب جديد', 'تم تقديم طلب جديد من قبل طالب', ?)
    `);
    
    supervisors.forEach(sup => {
      insertNotif.run(sup.id, info.lastInsertRowid);
    });
    
    res.json({ success: true, data: { id: info.lastInsertRowid } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/mine', requireRole('student'), (req, res) => {
  try {
    const application = db.prepare(`
      SELECT a.*, p.title_ar, p.title_en
      FROM applications a
      JOIN positions p ON a.position_id = p.id
      WHERE a.student_id = ?
    `).get(req.user.id);
    
    res.json({ success: true, data: application || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', requireRole('supervisor', 'admin'), (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT a.*, u.name as student_name, p.title_ar as position_title
      FROM applications a
      JOIN users u ON a.student_id = u.id
      JOIN positions p ON a.position_id = p.id
    `;
    const params = [];
    
    if (status) {
      query += ' WHERE a.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY a.submitted_at DESC';
    const applications = db.prepare(query).all(...params);
    
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const application = db.prepare(`
      SELECT a.*, u.name as student_name, p.title_ar as position_title
      FROM applications a
      JOIN users u ON a.student_id = u.id
      JOIN positions p ON a.position_id = p.id
      WHERE a.id = ?
    `).get(req.params.id);
    
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/:id', requireRole('supervisor'), (req, res) => {
  try {
    const { id } = req.params;
    const { status, supervisor_note } = req.body;
    
    const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    if (!app) return res.status(404).json({ success: false, message: 'Not found' });
    
    if (status === 'accepted') {
      db.prepare(`
        UPDATE applications SET status = ?, supervisor_note = ?, accepted_at = datetime('now') WHERE id = ?
      `).run(status, supervisor_note || null, id);
      
      const insertTask = db.prepare(`
        INSERT INTO tasks (application_id, title_ar, description_ar, task_type, is_available, source_text, order_index)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sourceText1 = "Horizon Translation & Localization was founded in 2015 with a simple mission: to bridge cultures through the power of language. Today, our team of 45 specialists works across 12 languages, serving clients in technology, legal, and media sectors across the Arab world and beyond. Our approach combines human expertise with the latest language technology to deliver translations that don't just convert words — they convey meaning, tone, and cultural nuance. We believe every translation is a conversation between two worlds.";
      
      insertTask.run(id, 'ترجمة محتوى رقمي تعريفي', 'ترجمة النبذة التعريفية للشركة', 'translation', 1, sourceText1, 1);
      insertTask.run(id, 'مراجعة وتدقيق نص مترجم', 'مراجعة النص لغويا', 'proofreading', 0, null, 2);
      insertTask.run(id, 'ترجمة وثيقة رسمية', 'ترجمة عقد', 'translation', 0, null, 3);
      insertTask.run(id, 'تعريب واجهة تطبيق', 'تعريب واجهة تطبيق', 'localization', 0, null, 4);
      insertTask.run(id, 'مشروع الترجمة الختامي', 'مشروع ختامي', 'final_project', 0, null, 5);
      
      db.prepare("INSERT INTO notifications (user_id, type, title_ar, body_ar, related_id) VALUES (?, 'application_accepted', 'تم قبول طلبك', 'مبارك، تم قبول طلبك للتدريب', ?)").run(app.student_id, id);
    } else if (status === 'rejected') {
      db.prepare(`
        UPDATE applications SET status = ?, supervisor_note = ? WHERE id = ?
      `).run(status, supervisor_note || null, id);
      db.prepare("INSERT INTO notifications (user_id, type, title_ar, body_ar, related_id) VALUES (?, 'application_rejected', 'تحديث بخصوص طلبك', 'نعتذر، لم يتم قبول طلبك', ?)").run(app.student_id, id);
    }
    
    res.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
