const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./assets/User.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Import Passport Local Strategy

const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Dostosuj ustawienia cookie do potrzeb
}));
passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, // Ustawić na pola używane w formularzach
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: 'Nieprawidłowy email' });
        }

        if (user.password !== password) {
          return done(null, false, { message: 'Nieprawidłowe hasło' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/anison-tattoo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik o podanym adresie email już istnieje' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji' });
      }
      return res.json({ message: 'Rejestracja zakończona sukcesem' });
    });
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji' });
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  // Obsługa logowania
  console.log('Zalogowano użytkownika:', req.user.username);
  res.json({ message: 'Zalogowano pomyślnie' });
});

app.get('/success', (req, res) => {
  // Przekierowanie po udanym logowaniu
  res.json({ message: 'Udane logowanie' });
});

app.get('/failure', (req, res) => {
  // Obsługa błędów logowania
  res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Wylogowano pomyślnie' });
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
