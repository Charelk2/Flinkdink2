import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';

const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

// Map Afrikaans breed names to their English equivalents so Unsplash can
// return matching results. The search terms are almost entirely in English,
// so Afrikaans queries often yield a 404 response.
export const breedMap = {
  // Dogs
  'Afgaanse hond': 'Afghan hound',
  'Goudkleurige Apporteerhond': 'Golden Retriever',
  'Dalmatiese hond': 'Dalmatian',
  Dashond: 'Dachshund',
  'Franse Dashond': 'Basset Hound',
  Jagwindhond: 'greyhound',
  Bulhond: 'Bulldog',
  'Engelse Patryshond': 'English pointer',
  Bloedhond: 'Bloodhound',
  'Rhodesiese Rifrughond': 'Rhodesian Ridgeback',
  // Cats (week 2)
  'Rob bruin Himalajan kat': 'Himalayan cat',
  'Siamese kat': 'Siamese cat',
  'Turkse Van kat': 'Turkish Van cat',
  'Chinchilla kat': 'Chinchilla cat',
  'Rooi Persiese kat': 'Red Persian cat',
  'Rokerige Swart Persiese kat': 'Smoky black Persian cat',
  'Turkse Angora kat': 'Turkish Angora cat',
  'Abbesini\u00e9r kat': 'Abyssinian cat',
  'Ragdoll kat': 'Ragdoll cat',
};

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

app.get('/api/photos', async (req, res) => {
  const { query, format } = req.query;
  if (!query) {
    res.status(400).json({ detail: 'Missing query parameter' });
    return;
  }
  res.set('Cache-Control', 'no-store');
  try {
    const searchTerm = breedMap[query] || query;
    const url = `${UNSPLASH_URL}?query=${encodeURIComponent(
      searchTerm,
    )}&per_page=1&w=640&q=80`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Unsplash error', response.status, errorText);
      res.status(response.status).json({
        detail: 'Unsplash request failed',
        status: response.status,
        error: errorText,
      });
      return;
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      res.status(404).json({ detail: 'Unsplash request failed' });
      return;
    }

    const { urls } = data.results[0];
    if (format && urls[format]) {
      res.json({ url: urls[format] });
    } else {
      res.json({ small: urls.small, regular: urls.regular });
    }
  } catch (err) {
    console.error('Fetch to Unsplash failed', err);
    res.status(502).json({ detail: 'Unsplash request failed', error: err.message });
  }
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
