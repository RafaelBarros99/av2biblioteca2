"use strict";

import { getDatabase, ref, query, onValue, onChildAdded, orderByChild, 
        child, orderByKey, equalTo, get, set, remove, push, runTransaction } 
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import Emprestimo from "./Emprestimo.js";
import ModelError from "/ModelError.js";


export default class DaoEmprestimo {
  
  static promessaConexao = null;
  
  constructor(){
    this.obterConexao();
  }
  
  async obterConexao(){
    
    if(DaoEmprestimo.promessaConexao == null) {
      DaoEmprestimo.promessaConexao = new Promise(function(resolve, reject) {
        const db = getDatabase();
        if(db)
            resolve(db);
        else 
            reject(new ModelError("Não foi possível estabelecer conexão com o BD"));
      });
    }
    return DaoEmprestimo.promessaConexao;
  }
  
  async obterEmprestimoPeloCodigo(codigo) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let dbRefEmprestimos = ref(connectionDB,'emprestimos/' + codigo  );
      let paramConsulta = orderByChild('codigo');
      let consulta = query(dbRefEmprestimos);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        let emprestimo = dataSnapshot.val();
        if(emprestimo != null){
          resolve(new Emprestimo(emprestimo.codigo, emprestimo.dataEmprestimo, emprestimo.dataRetorno));
        }
        else
          resolve(null);
      });
    });
  }
  
  async obterEmprestimos() {
    let connectionDB = await this.obterConexao();      
    return new Promise((resolve) => {
      let conjEmprestimos = [];      
      let dbRefEmprestimos = ref(connectionDB,'emprestimos');
      let consulta = query(dbRefEmprestimos);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach( (dataSnapshotObj) => {
          let elem = dataSnapshotObj.val();
          conjEmprestimos.push(new Emprestimo(elem.codigo, elem.dataEmprestimo, elem.dataRetorno));
        });
        
        resolve(conjEmprestimos);
      },(e) => console.log("#" + e));
    });
  }
  
  async incluir(emprestimo) {
    let connectionDB = await this.obterConexao();    
    
    let resultado = new Promise( (resolve, reject) => {
      let dbRefEmprestimos = ref(connectionDB,'emprestimos');
      runTransaction(dbRefEmprestimos, (emprestimos) => {       
        let dbRefNovoEmprestimo = child(dbRefEmprestimos, emprestimo.getCodigo());
        let setPromise = set(dbRefNovoEmprestimo, emprestimo);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
  
  async alterar(emprestimo) {
    let connectionDB = await this.obterConexao();    
    
    let resultado = new Promise( (resolve, reject) => {   
      let dbRefEmprestimos = ref(connectionDB,'emprestimos');
      runTransaction(dbRefEmprestimos, (emprestimos) => {       
        let dbRefAlterarEmprestimo = child(dbRefEmprestimos, emprestimo.getCodigo());
        let setPromise = set(dbRefAlterarEmprestimo, emprestimo);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
  
  async excluir(emprestimo) {
    let connectionDB = await this.obterConexao();    
    //--------- PROMISE --------------//
    let resultado = new Promise( (resolve, reject) => {   
      let dbRefEmprestimos = ref(connectionDB,'emprestimos');
      runTransaction(dbRefEmprestimos, (emprestimos) => {       
        let dbRefExcluirEmprestimo = child(dbRefEmprestimos, emprestimo.getCodigo());
        let setPromise = remove(dbRefExcluirEmprestimo, emprestimo);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
}