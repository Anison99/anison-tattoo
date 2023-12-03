// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pl: {
    translation: {
        // ------ NAVBAR ---------
        'aboutUs': 'O nas',
        'artworks': 'Nasze prace',
        'contact': 'Kontakt',
        'profile': 'Profil',
        'login': 'Zaloguj',
        'logout': 'Wyloguj',
        'register': 'Zarejestruj',
        //------ ABOUT US ---------
        'aboutUsHead': 'O NAS',
        //------ ARTWORKS ---------
        'artworksHead': 'NASZE PRACE',
        //------ CONTACT ---------
        'contactHead': 'KONTAKT',
        //------ FOOTER ---------
        'phone': 'Telefon',
        'media': 'Media społecznościowe',
        'credits': 'Wykreowane na potrzeby pracy inzynierskiej Akademii Tarnowskiej.',
        'reg': 'Regulamin',
        //------ LOGIN ---------
        'email': 'Adres email',
        'pass': 'Hasło',
        'quest1': 'Nie masz jeszcze konta?',
        'quest2': 'Zarejestruj się!',
        //------ REGISTER ---------
        'user': 'Nazwa użytkownika',
        'quest3': 'Masz już konto?',
        'quest4': 'Zaloguj się!',
        'user2': 'Taki użytkownik już istnieje!',
        //------ USER PROFILE ---------
        'user1': 'Profil użytkownika',
        'session1': 'Edytuj sesję',
        'session2': 'Zapisz się na sesję',
        'session3': 'Wiadomość do tatuatora',
        'session4': 'Zapisz zmiany',
        'session5': 'Zapisz się',
        //------ USER SESSIONS ---------
        'res1': 'Twoje rezerwacje sesji',
        'res2': 'Data',
        'res3': 'Godzina',
        'res4': 'Odwołaj sesję',
        //------ USER MESSAGES ---------
        'mes1': 'Wiadomość do studia',
        'mes2': 'Napisz wiadomość...',
        'mes3': 'Wyślij',
        //----- OTHER -----
        'err1': 'Błędny adres email lub hasło',
        

    },
  },
  en: {
    translation: {
        // ------ NAVBAR ---------
        'aboutUs': 'About Us',
        'artworks': 'Artworks',
        'contact': 'Contact',
        'profile': 'Profile',
        'login': 'Sign in',
        'logout': 'Sign out',
        'register': 'Sign up',
        //------ ABOUT US ---------
        'aboutUsHead': 'ABOUT US',
        //------ ARTWORKS ---------
        'artworksHead': 'ARTWORKS',
        //------ CONTACT ---------
        'contactHead': 'CONTACT',
        //------ FOOTER ---------
        'phone': 'Phone',
        'media': 'Social media',
        'credits': 'Created for the needs of engineering work at University of Tarnów.',
        'reg': 'Statute',
        //------ LOGIN ---------
        'email': 'Email adress',
        'pass': 'Password',
        'quest1': 'You don`t have an account yet?',
        'quest2': 'Sign up now!',
        //------ REGISTER ---------
        'user': 'User name',
        'quest3': 'Already have an account?',
        'quest4': 'Log in!',
        'user2': 'This user already exist!',
        //------ USER PROFILE ---------
        'user1': 'User profile',
        'session1': 'Edit session',
        'session2': 'Sign up for a session',
        'session3': 'Message to the tattoo artist',
        'session4': 'Save changes',
        'session5': 'Sign up',
        //------ USER SESSIONS ---------
        'res1': 'Your session bookings',
        'res2': 'Date',
        'res3': 'Time',
        'res4': 'Cancel the session',
        //------ USER MESSAGES ---------
        'mes1': 'Message to the studio',
        'mes2': 'Write a message...',
        'mes3': 'Send',
        //----- OTHER -----
        'err1': 'Incorrect email address or password',
    },
  },
};

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'pl',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export { changeLanguage };
export default i18n;
