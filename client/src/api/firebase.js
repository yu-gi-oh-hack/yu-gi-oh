// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#config-web-app -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyA_oRr0c57-huvDfysn9RRWL5Nii50uSq0",
//     authDomain: "yu-gi-oh-dd7d2.firebaseapp.com",
//     databaseURL: "https://yu-gi-oh-dd7d2.firebaseio.com",
//     projectId: "yu-gi-oh-dd7d2",
//     storageBucket: "yu-gi-oh-dd7d2.appspot.com",
//     messagingSenderId: "579278828065",
//     appId: "1:579278828065:web:ea0a85774536406d"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>

const config = {
    apiKey: "AIzaSyA_oRr0c57-huvDfysn9RRWL5Nii50uSq0",
    authDomain: "yu-gi-oh-dd7d2.firebaseapp.com",
    databaseURL: "https://yu-gi-oh-dd7d2.firebaseio.com",
    projectId: "yu-gi-oh-dd7d2",
    storageBucket: "yu-gi-oh-dd7d2.appspot.com",
    messagingSenderId: "579278828065",
  };
  
  const firebase = require('firebase');
  
  firebase.initializeApp(config);
  
  const db = firebase.firestore();
  
  
  export default db;
  