const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const sessionSecret = process.env.SESSION_SECRET || 'default-secret-key';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/pracainz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Błąd połączenia z MongoDB:'));
db.once('open', () => {
  console.log('Połączenie z MongoDB zostało nawiązane');
});

// ------------ Definicja schematu użytkownika
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// ------------ Definicja schematu dla sesji 
const sessionSchema = new mongoose.Schema({
  userId: String,
  sessionDate: Date,
  sessionTime: String,
  messageToTattooArtist: String,
});

const Session = mongoose.model('Session', sessionSchema);

// ------------ Definicja schematu dla wiadomości
const messageSchema = new mongoose.Schema({
  userId: String,
  content: String,
});

const Message = mongoose.model('Message', messageSchema);

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'Invalid email' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


// obsługa rejestracji
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after registration' });
      }
      return res.json({ message: 'Registration and login successful' });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
});

// Kod obsługi logowania użytkownika
app.post('/login', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Login failed' });
        }
        console.log('User logged in:', req.user.username);
        return res.json({ message: 'Login successful' });
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error during login' });
    }
  })(req, res, next);
});


// Rejestracja na sesję
app.post('/api/sessions', async (req, res) => {
  try {
    const { sessionDate, sessionTime, messageToTattooArtist } = req.body;
    const userId = req.isAuthenticated() ? req.user.id : null;

    const newSession = new Session({
      userId,
      sessionDate,
      sessionTime,
      messageToTattooArtist,
    });

    await newSession.save();

    res.status(200).json({ message: 'Session reservation successful', session: newSession });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Error creating session' });
  }
});

// Edycja sesji
app.put('/api/sessions/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { sessionDate, sessionTime, messageToTattooArtist } = req.body;

    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { sessionDate, sessionTime, messageToTattooArtist },
      { new: true }
    );

    res.status(200).json({ message: 'Session edit successful', session: updatedSession });
  } catch (error) {
    console.error('Error editing session:', error);
    res.status(500).json({ message: 'Error editing session' });
  }
});

// Pobranie danych o sesji użytkownika
// Pobranie danych o sesji użytkownika
app.get('/api/user/sessions', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user.id;

    const userSessions = await Session.find({ userId });

    if (!userSessions || userSessions.length === 0) { // Dodatkowa zmiana
      return res.status(404).json({ message: 'No sessions found for this user' });
    }

    res.status(200).json({ sessions: userSessions });
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    res.status(500).json({ message: 'Error fetching user sessions' });
  }
});

// Usuwanie sesji
app.delete('/api/sessions/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    console.log('Received sessionId:', sessionId); // Dodany console.log

    await Session.findByIdAndDelete(sessionId);

    res.status(200).json({ message: 'Session canceled successfully', canceledSession: { id: sessionId } });
  } catch (error) {
    console.error('Error canceling session:', error);
    res.status(500).json({ message: 'Error canceling session' });
  }
});



// Wysyłanie wiadomości do studia
app.post('/api/messages', async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.isAuthenticated() ? req.user.id : null;

    const newMessage = new Message({ userId, content });

    await newMessage.save();

    res.status(200).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// nasłuchiwanie serwera
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
