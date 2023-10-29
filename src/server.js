const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./assets/User.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // TODO: ustawienia cookie 
  })
);

// Konfiguracja Passport
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

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

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/anison-tattoo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Obsługa rejestracji użytkownika
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
        return res.status(500).json({ message: 'Błąd logowania po rejestracji' });
      }
      return res.json({ message: 'Rejestracja i logowanie zakończone sukcesem' });
    });
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji' });
  }
});

// Obsługa logowania użytkownika
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Obsługa logowania
  console.log('Zalogowano użytkownika:', req.user.username);
  res.json({ message: 'Zalogowano pomyślnie' });
});

// Przekierowanie po udanym logowaniu
app.get('/success', (req, res) => {
  res.json({ message: 'Udane logowanie' });
});

// Obsługa błędów logowania
app.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
});

// Wylogowanie użytkownika
app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Wylogowano pomyślnie' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
