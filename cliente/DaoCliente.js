"use strict";

import { getDatabase, ref, query, onValue, onChildAdded, orderByChild, 
        child, orderByKey, equalTo, get, set, remove, push, runTransaction } 
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import Cliente from "./Cliente.js";
import ModelError from "/ModelError.js";

export default class DaoCliente {
  
  static promessaConexao = null;
  
  constructor(){
    this.obterConexao();
  }
  
  async obterConexao(){
    
    if(DaoCliente.promessaConexao == null) {
      DaoCliente.promessaConexao = new Promise(function(resolve, reject) {
        const db = getDatabase();
        if(db)
            resolve(db);
        else 
            reject(new ModelError("Não foi possível estabelecer conexão com o BD"));
      });
    }
    return DaoCliente.promessaConexao;
  }
  
  async obterClientePeloCpf(cpf) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let dbRefClientes = ref(connectionDB,'clientes/' + cpf  );
      let consulta = query(dbRefClientes);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        let cliente = dataSnapshot.val();
        if(cliente != null)
          resolve(new Cliente(cliente.cpf, cliente.nome, cliente.email));
        else
          resolve(null);
      });
    });
  }
  
  async obterClientes() {
    let connectionDB = await this.obterConexao();      
    return new Promise((resolve) => {
      let conjClientes = [];      
      let dbRefClientes = ref(connectionDB,'clientes');
      let paramConsulta = orderByChild('cpf');
      let consulta = query(dbRefClientes);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach( (dataSnapshotObj) => {
          let chave = dataSnapshotObj.key; 
          let elem = dataSnapshotObj.val();
          conjClientes.push(new Cliente(elem.cpf, elem.nome, elem.email));
        });
        
        resolve(conjClientes);
      },(e) => console.log("#" + e));
    });
  }
  
  async incluir(cliente) {
    let connectionDB = await this.obterConexao();    
    
    let resultado = new Promise( (resolve, reject) => {
      let dbRefClientes = ref(connectionDB,'clientes');
      runTransaction(dbRefClientes, (clientes) => {       
        let dbRefNovoCliente = child(dbRefClientes, cliente.getCpf());
        let setPromise = set(dbRefNovoCliente, cliente);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
  
  async alterar(cliente) {
    let connectionDB = await this.obterConexao();    
    
    let resultado = new Promise( (resolve, reject) => {   
      let dbRefClientes = ref(connectionDB,'clientes');
      runTransaction(dbRefClientes, (clientes) => {       
        let dbRefAlterarCliente = child(dbRefClientes, cliente.getCpf());
        let setPromise = set(dbRefAlterarCliente, cliente);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
  
  async excluir(cliente) {
    let connectionDB = await this.obterConexao();    
    //--------- PROMISE --------------//
    let resultado = new Promise( (resolve, reject) => {   
      let dbRefClientes = ref(connectionDB,'clientes');
      runTransaction(dbRefClientes, (clientes) => {       
        let dbRefExcluirCliente = child(dbRefClientes, cliente.getCpf());
        let setPromise = remove(dbRefExcluirCliente, cliente);
        setPromise.then( value => {resolve(true)},  erro => {reject(erro)});
      });
    });
    return resultado;
  }
}