"use strict";

import { getDatabase, ref, query, onValue, onChildAdded, orderByChild, 
        child, orderByKey, equalTo, get, set, remove, push, runTransaction } 
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import Livro from "./Livro.js";
import ModelError from "/ModelError.js";

export default class DaoLivro {
  
  static promessaConexao = null;
  
  constructor(){
    this.obterConexao();
  }
  
  async obterConexao(){
    
    if(DaoLivro.promessaConexao == null) {
      DaoLivro.promessaConexao = new Promise(function(resolve, reject) {
        const db = getDatabase();
        if(db)
            resolve(db);
        else 
            reject(new ModelError("Não foi possível estabelecer conexão com o BD"));
      });
    }
    return DaoLivro.promessaConexao;
  }
  
  async obterLivroPeloId(id) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let dbRefLivros = ref(connectionDB,'livros/' + id );
      let consulta = query(dbRefLivros);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        let livro = dataSnapshot.val();
        if(livro != null)
          resolve(new Livro(livro.id, livro.titulo, livro.edicao, livro.genero, livro.palavraChave, livro.autor));
        else
          resolve(null);
      });
    });
  }
  
  async obterLivros() {
    let connectionDB = await this.obterConexao();      
    return new Promise((resolve) => {
      let conjLivros = [];      
      let dbRefLivros = ref(connectionDB,'livros');
      let paramConsulta = orderByChild('id');
      let consulta = query(dbRefLivros);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach( (dataSnapshotObj) => {
          let chave = dataSnapshotObj.key; 
          let elem = dataSnapshotObj.val();
          conjLivros.push(new Livro(elem.id, elem.titulo, elem.edicao, elem.genero, elem.palavraChave, elem.autor));
        });
        
        resolve(conjLivros);
      },(e) => console.log("#" + e));
    });
  }
  
  async incluir(livro) {
    let connectionDB = await this.obterConexao();    
    
    let resultado = new Promise( (resolve, reject) => {
      let dbRefLivros = ref(connectionDB,'livros');
      runTransaction(dbRefLivros, (livros) => {       
        let dbRefNovoLivro = child(dbRefLivros, livro.getId());
        let setPromise = set(dbRefNovoLivro, livro);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
  
  async alterar(livro) {
    let connectionDB = await this.obterConexao();    
    
    let resultado = new Promise( (resolve, reject) => {   
      let dbRefLivros = ref(connectionDB,'livros');
      runTransaction(dbRefLivros, (livros) => {       
        let dbRefAlterarLivro = child(dbRefLivros,livro.getId());
        let setPromise = set(dbRefAlterarLivro, livro);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
  
  async excluir(livro) {
    let connectionDB = await this.obterConexao();    
    //--------- PROMISE --------------//
    let resultado = new Promise( (resolve, reject) => {   
      let dbRefLivros = ref(connectionDB,'livros');
      runTransaction(dbRefLivros, (livros) => {       
        let dbRefExcluirLivro = child(dbRefLivros,livro.getId());
        let setPromise = remove(dbRefExcluirLivro, livro);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
}