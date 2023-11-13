const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db');

db.serialize(() => {
  // skonstruuj tabele użytkowników
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // skonstruuj tabele sesji
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      sessionDate TEXT NOT NULL,
      sessionTime TEXT NOT NULL,
      messageToTattooArtist TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // skonstruuj tabele wiadomosci
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      content TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);
});

module.exports = db;
