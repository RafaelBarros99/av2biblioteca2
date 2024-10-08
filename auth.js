import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

import {
  getAuth,
  signInWithRedirect,
  browserSessionPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAznSFkWUv_4MSEZ70D_vZVWLDvvzskC2M",
  authDomain: "prj-firebase-trab.firebaseapp.com",
  databaseURL: "https://prj-firebase-trab-default-rtdb.firebaseio.com",
  projectId: "prj-firebase-trab",
  storageBucket: "prj-firebase-trab.appspot.com",
  messagingSenderId: "298888352360",
  appId: "1:298888352360:web:be6c9707c55e728963e1dd",
  measurementId: "G-D17DEZMFKN"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/userinfo.email");
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");


const auth = getAuth(app);
auth.languageCode = "pt-BR";
auth.setPersistence(browserSessionPersistence);

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "/init.html";
  } else {
    signInWithRedirect(auth, provider);
  }
});

//

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
  .then(function(reg) {
    
    console.log('Registro do Service Worker bem sucedido. O escopo de uso é ' + reg.scope);
  }).catch(function(error) {
    
    console.log('Registro do Service Worker com ' + error);
  });
}