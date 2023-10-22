const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Moduł CORS
const User = require('./assets/User.js'); // Model użytkownika

app.use(express.json()); // Umożliwia odczyt danych z zapytania w formacie JSON
app.use(cors());

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/anison-tattoo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint do obsługi rejestracji
app.post('/register', async (req, res) => {
  try {
    // Dane z zapytania POST
    const { username, email, password } = req.body;

    // Sprawdź, czy użytkownik o podanym adresie email już istnieje w bazie
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Jeśli istnieje, zwróć błąd
      return res.status(400).json({ message: 'Użytkownik o podanym adresie email już istnieje' });
    }

    // Jeśli użytkownik o podanym adresie email nie istnieje, utwórz nowego użytkownika
    const newUser = new User({ username, email, password });

    // Zapisz nowego użytkownika w bazie danych
    await newUser.save();

    // Zwróć odpowiedź
    res.json({ message: 'Rejestracja zakończona sukcesem' });
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji' });
  }
});

// Endpoint do obsługi logowania
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Logika uwierzytelniania użytkownika
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      // Jeśli użytkownik o podanym emailu nie istnieje, zwróć błąd
      return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
    }

    // Sprawdź, czy hasło jest prawidłowe
    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      // Jeśli hasło jest nieprawidłowe, zwróć błąd
      return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
    }

    // Zwróć odpowiedź sukcesu
    res.status(200).json({ message: 'Zalogowano pomyślnie' });
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas logowania' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
