const express = require('express');
const db = require('../db/database');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { language } = req.query;
    let query = 'SELECT * FROM positions ORDER BY order_index ASC';
    let positions = db.prepare(query).all();
    
    if (language) {
      positions = positions.filter(pos => {
        try {
          const langs = JSON.parse(pos.available_for_languages);
          return langs.includes(language);
        } catch { return false; }
      });
    }
    
    res.json({ success: true, data: positions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const position = db.prepare('SELECT * FROM positions WHERE id = ?').get(req.params.id);
    if (!position) return res.status(404).json({ success: false, message: 'Position not found' });
    res.json({ success: true, data: position });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
