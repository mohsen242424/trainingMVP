function createTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT CHECK (role IN ('student', 'supervisor', 'admin')) NOT NULL,
      university TEXT,
      major TEXT,
      study_year TEXT,
      language TEXT DEFAULT 'ar',
      avatar_url TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS positions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ar TEXT NOT NULL,
      title_en TEXT NOT NULL,
      department_ar TEXT,
      description_ar TEXT,
      requirements_ar TEXT,
      language_required TEXT,
      is_available INTEGER DEFAULT 0,
      available_for_languages TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER REFERENCES users(id),
      position_id INTEGER REFERENCES positions(id),
      status TEXT DEFAULT 'pending',
      cv_text TEXT,
      cv_file_url TEXT,
      answers TEXT,
      supervisor_note TEXT,
      submitted_at TEXT DEFAULT (datetime('now')),
      reviewed_at TEXT,
      accepted_at TEXT
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id INTEGER REFERENCES applications(id),
      title_ar TEXT NOT NULL,
      description_ar TEXT NOT NULL,
      task_type TEXT,
      is_available INTEGER DEFAULT 0,
      source_text TEXT,
      expected_output_notes TEXT,
      deadline TEXT,
      order_index INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER REFERENCES tasks(id),
      student_id INTEGER REFERENCES users(id),
      submitted_text TEXT,
      submitted_file_url TEXT,
      status TEXT DEFAULT 'submitted',
      ai_feedback TEXT,
      supervisor_feedback TEXT,
      score INTEGER,
      submitted_at TEXT DEFAULT (datetime('now')),
      reviewed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_user_id INTEGER REFERENCES users(id),
      to_user_id INTEGER REFERENCES users(id),
      application_id INTEGER REFERENCES applications(id),
      content TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      sent_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS meetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supervisor_id INTEGER REFERENCES users(id),
      student_id INTEGER REFERENCES users(id),
      application_id INTEGER REFERENCES applications(id),
      title TEXT,
      scheduled_at TEXT,
      duration_minutes INTEGER DEFAULT 30,
      meeting_link TEXT,
      notes TEXT,
      status TEXT DEFAULT 'scheduled',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id),
      type TEXT,
      title_ar TEXT,
      body_ar TEXT,
      is_read INTEGER DEFAULT 0,
      related_id INTEGER,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

module.exports = { createTables };
