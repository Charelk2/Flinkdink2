import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';

dotenv.config();

const { Database } = sqlite3;
const db = new Database(process.env.DB_PATH || './users.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, password_hash TEXT)');
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT password_hash FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      console.error('DB error during login', err);
      res.status(500).json({ detail: 'Database error' });
      return;
    }
    if (!row) {
      res.status(422).json({ detail: 'Invalid credentials' });
      return;
    }

    const valid = await bcrypt.compare(password, row.password_hash);
    if (!valid) {
      res.status(422).json({ detail: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT email FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      console.error('DB error during lookup', err);
      res.status(500).json({ detail: 'Database error' });
      return;
    }
    if (row) {
      res.status(422).json({ detail: 'User already exists' });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash], (insertErr) => {
      if (insertErr) {
        console.error('DB error during insert', insertErr);
        res.status(500).json({ detail: 'Database error' });
        return;
      }
      console.log(`Registered new user ${email}`);
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

const port = process.env.PORT || 3001;
// Generic error handler to capture unexpected errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ detail: err.message || 'Internal server error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API server running on ${port}`);
  });
}

export default app;
