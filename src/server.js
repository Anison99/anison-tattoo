const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./assets/User.js'); // model użytkownika

app.use(express.json()); // Umożliwia odczyt danych z zapytania w formacie JSON

// połączenie z mongodb
mongoose.connect('mongodb://localhost:27017/anison-tattoo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// endpoint do obsługi rejestracji
app.post('/register', async (req, res) => {
  try {
    // dane z zapytania POST
    const { username, email, password } = req.body;

    // Sprawdź, czy użytkownik o podanym adresie email już istnieje w bazie
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Jeśli istnieje, zwróć błąd
      return res.status(400).json({ message: 'Użytkownik o podanym adresie email już istnieje' });
    }

    // Jeśli użytkownik o podanym adresie email nie istnieje, utwórz nowego użytkownika
    const newUser = new User({ username, email, password });
    // -------------------------------------------------------------------------
    // TODO: dodać logikę walidacji hasła i inne zabezpieczenia
    // -------------------------------------------------------------------------

    // Zapisz nowego użytkownika w bazie danych
    await newUser.save();

    // zwrócenie odpowiedzi
    res.json({ message: 'Rejestracja zakończona sukcesem' });
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
