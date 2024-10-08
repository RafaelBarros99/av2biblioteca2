"use strict";

import Status from "/Status.js";
import Cliente from "./Cliente.js";
import ClienteDTO from "./ClienteDTO.js";
import DaoCliente from "./DaoCliente.js";
import ViewerCliente from "./ViewerCliente.js";

export default class CtrlManterClientes {
  
  //-----------------------------------------------------------------------------------------//

  #daoCliente;      
  #viewer;   
  #posAtual; 
  #status;   
  
  //-----------------------------------------------------------------------------------------//

  constructor() {
    this.#daoCliente = new DaoCliente();
    this.#viewer = new ViewerCliente(this);
    this.#posAtual = 1;
    this.#atualizarContextoNavegacao();    
  }
  
  //-----------------------------------------------------------------------------------------//

  async #atualizarContextoNavegacao() {
    
    this.#status = Status.NAVEGANDO;

    
    this.#viewer.statusApresentacao();
    
    
    let conjClientes = await this.#daoCliente.obterClientes();
    
    
    if(conjClientes.length == 0) {
      
      this.#posAtual = 0;
      
      
      this.#viewer.apresentar(0, 0, null);
    }
    else {
      
      if(this.#posAtual == 0 || this.#posAtual > conjClientes.length)
        this.#posAtual = 1;
      
      this.#viewer.apresentar(this.#posAtual, conjClientes.length, new ClienteDTO(conjClientes[this.#posAtual - 1]));
    }
  }
  
  //-----------------------------------------------------------------------------------------//

  async apresentarPrimeiro() {
    let conjClientes = await this.#daoCliente.obterClientes();
    if(conjClientes.length > 0)
      this.#posAtual = 1;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarProximo() {
    let conjClientes = await this.#daoCliente.obterClientes();
    if(this.#posAtual < conjClientes.length)
      this.#posAtual++;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarAnterior() {
    let conjClientes = await this.#daoCliente.obterClientes();
    if(this.#posAtual > 1)
      this.#posAtual--;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarUltimo() {
    let conjClientes = await this.#daoCliente.obterClientes();
    this.#posAtual = conjClientes.length;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//
  
  iniciarIncluir() {
    this.#status = Status.INCLUINDO;
    this.#viewer.statusEdicao(Status.INCLUINDO);
    
    this.efetivar = this.incluir;
  }

  //-----------------------------------------------------------------------------------------//
  
  iniciarAlterar() {
    this.#status = Status.ALTERANDO;
    this.#viewer.statusEdicao(Status.ALTERANDO);
    
    this.efetivar = this.alterar;
  }

  //-----------------------------------------------------------------------------------------//
  
  iniciarExcluir() {
    this.#status = Status.EXCLUINDO;
    this.#viewer.statusEdicao(Status.EXCLUINDO);
    
    this.efetivar = this.excluir;
  }

  //-----------------------------------------------------------------------------------------//
 
  async incluir(cpf, nome, email) {
    if(this.#status == Status.INCLUINDO) {
      try {
        let cliente = new Cliente(cpf, nome, email);
        await this.#daoCliente.incluir(cliente); 
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//
 
  async alterar(cpf, nome, email) {
    if(this.#status == Status.ALTERANDO) {
      try {
        let cliente = await this.#daoCliente.obterClientePeloCpf(cpf); 
        if(cliente == null) {
          alert("Cliente com a cpf " + cpf + " não encontrado.");
        } else {
          cliente.setCpf(cpf);
          cliente.setNome(nome);
          cliente.setEmail(email);
          await this.#daoCliente.alterar(cliente); 
        }
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//
 
  async excluir(cpf) {
    if(this.#status == Status.EXCLUINDO) {
      try {
        let cliente = await this.#daoCliente.obterClientePeloCpf(cpf); 
        if(cliente == null) {
          alert("Cliente com a cpf " + cpf + " não encontrado.");
        } else {
          await this.#daoCliente.excluir(cliente); 
        }
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//

  cancelar() {
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  getStatus() {
    return this.#status;
  }

  //-----------------------------------------------------------------------------------------//
}

//------------------------------------------------------------------------//
