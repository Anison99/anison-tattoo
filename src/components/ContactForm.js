import React, { useState } from 'react';
import '../css/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // DODAJ logikę obsługi formularza (wysłać danych na serwer)
    console.log('Wysłano formularz:', formData);
  };

  return (
    <div className="contact-form">
      <h2>Formularz kontaktowy</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Imię:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Wiadomość:
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </label>
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};

export default ContactForm;
