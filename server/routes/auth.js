const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'afuq_jwt_secret_2024_production';

router.post('/register', (req, res) => {
  try {
    const { name, email, password, university, major, study_year, language } = req.body;
    
    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Invalid fields' });
    }
    
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    
    const hash = bcrypt.hashSync(password, 10);
    const info = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, university, major, study_year, language)
      VALUES (?, ?, ?, 'student', ?, ?, ?, ?)
    `).run(name, email, hash, university || null, major || null, study_year || null, language || 'ar');
    
    const user = db.prepare('SELECT id, name, email, role, university, major, study_year, language, avatar_url FROM users WHERE id = ?').get(info.lastInsertRowid);
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ success: true, data: { token, user } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    if (user.is_active === 0) {
      return res.status(403).json({ success: false, message: 'Account disabled' });
    }
    
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    delete user.password_hash;
    
    res.json({ success: true, data: { token, user } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/me', authenticateToken, (req, res) => {
  const user = { ...req.user };
  delete user.password_hash;
  res.json({ success: true, data: user });
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

module.exports = router;
