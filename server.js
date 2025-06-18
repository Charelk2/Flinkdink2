import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'demo@example.com' && password === 'password') {
    res.json({ token: 'demo-token' });
  } else {
    console.error(`Invalid login attempt for ${email}`);
    res.status(422).json({ detail: 'Invalid credentials' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server running on ${port}`);
});
