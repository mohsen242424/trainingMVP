const Database = require('better-sqlite3');
const path = require('path');
const { createTables } = require('./schema');
const { seedData } = require('./seed');

const dbPath = path.join(__dirname, 'afuq.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency and performance
db.pragma('journal_mode = WAL');

// Initialize schema
createTables(db);

// Seed initial data if needed
seedData(db);

module.exports = db;
