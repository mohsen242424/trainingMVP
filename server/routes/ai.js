const express = require('express');
const db = require('../db/database');
const { authenticateToken, requireRole } = require('../middleware/auth');
const aiService = require('../services/aiService');

const router = express.Router();
router.use(authenticateToken);

router.post('/evaluate-translation', async (req, res) => {
  try {
    const { taskId, sourceText, studentTranslation } = req.body;
    
    const evaluation = await aiService.evaluateTranslation(sourceText, studentTranslation);
    
    if (!evaluation.error) {
      db.prepare('UPDATE submissions SET ai_feedback = ? WHERE task_id = ? AND student_id = ?').run(
        JSON.stringify(evaluation), taskId, req.user.id
      );
    }
    
    res.json({ success: true, data: evaluation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/evaluate-answers', requireRole('supervisor'), async (req, res) => {
  try {
    const { applicationId } = req.body;
    
    const app = db.prepare(`
      SELECT a.answers, p.title_ar 
      FROM applications a JOIN positions p ON a.position_id = p.id 
      WHERE a.id = ?
    `).get(applicationId);
    
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    
    const evaluation = await aiService.evaluateApplicationAnswers(app.title_ar, app.answers);
    res.json({ success: true, data: evaluation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
