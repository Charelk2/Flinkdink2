import express from 'express';
import cors from 'cors';

const app = express();
const users = { 'demo@example.com': { password: 'password' } };
app.use(express.json());
app.use(cors());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (user && user.password === password) {
    res.json({ token: `${email}-token` });
  } else {
    console.error(`Invalid login attempt for ${email}`);
    res.status(422).json({ detail: 'Invalid credentials' });
  }
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (users[email]) {
    res.status(422).json({ detail: 'User already exists' });
    return;
  }
  users[email] = { password };
  console.log(`Registered new user ${email}`);
  res.json({ token: `${email}-token` });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server running on ${port}`);
});
