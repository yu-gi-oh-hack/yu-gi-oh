const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: 'yu-gi-oh-dd7d2',
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
  };
  
  const firebase = require('firebase');
  
  firebase.initializeApp(config);
  
  const db = firebase.firestore();
  
  
  export default db;
  