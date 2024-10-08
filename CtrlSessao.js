"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, browserSessionPersistence, GoogleAuthProvider, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, query, onValue, onChildAdded, orderByChild, orderByKey, equalTo, get, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

import CtrlManterClientes from "./cliente/CtrlManterClientes.js";
import CtrlManterLivros from "./livro/CtrlManterLivros.js";
import CtrlManterEmprestimos from "./emprestimo/CtrlManterEmprestimos.js";

const swal = new Function("json,th", "swal(json).then(th)");

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
const analytics = getAnalytics(app);
const database = getDatabase();

export default class CtrlSessao {
  
  //-----------------------------------------------------------------------------------------//  
  constructor() {    
    this.init();
  }
  
  //-----------------------------------------------------------------------------------------//  
  async init() {    
    try {
      this.usuario = await this.verificandoLogin();
      if(document.URL.includes("cliente/clientes.html"))
        this.ctrlAtual = new CtrlManterClientes();
      else if(document.URL.includes("livro/livros.html"))
        this.ctrlAtual = new CtrlManterLivros();
      else if(document.URL.includes("emprestimo/emprestimos.html"))
        this.ctrlAtual = new CtrlManterEmprestimos();
    } catch(e) {
      alert(e);
    }
  }
  
  //-----------------------------------------------------------------------------------------//  
  async verificandoLogin() {
    return new Promise((resolve,reject) => {
      //const analytics = getAnalytics(app);
      //const provider = new GoogleAuthProvider();
      //provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      //provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

      const auth = getAuth(app);
      auth.setPersistence(browserSessionPersistence);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if(!user.email.includes('lasalle')) {
            reject('A conta "' + user.email + '" não pertence ao domínio institucional da UniLaSalle, logo não tem acesso ao sistema.');
          } else {
            resolve(user);
          }
        } else {
          reject('Você não realizou a autenticação via Google');
        }
      });
    });
  }
}

//------------------------------------------------------------------------//


new CtrlSessao();