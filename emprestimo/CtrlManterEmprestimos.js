"use strict";

import Status from "/Status.js";
import Emprestimo from "./Emprestimo.js";
import EmprestimoDTO from "./EmprestimoDTO.js";
import DaoEmprestimo from "./DaoEmprestimo.js";
import ViewerEmprestimo from "./ViewerEmprestimo.js";

export default class CtrlManterEmprestimos {
  
  //-----------------------------------------------------------------------------------------//

  #daoEmprestimo;
  #viewer;   
  #posAtual; 
  #status;   
  
  //-----------------------------------------------------------------------------------------//

  constructor() {
    this.#daoEmprestimo = new DaoEmprestimo();
    this.#viewer = new ViewerEmprestimo(this);
    this.#posAtual = 1;
    this.#atualizarContextoNavegacao();    
  }
  
  //-----------------------------------------------------------------------------------------//


  async #atualizarContextoNavegacao() {
    
    this.#status = Status.NAVEGANDO;

    
    this.#viewer.statusApresentacao();
    
    
    let conjEmprestimos = await this.#daoEmprestimo.obterEmprestimos();
    
    
    if(conjEmprestimos.length == 0) {
      
      this.#posAtual = 0;
      
      
      this.#viewer.apresentar(0, 0, null);
    }
    else {
      
      if(this.#posAtual == 0 || this.#posAtual > conjEmprestimos.length)
        this.#posAtual = 1;
      
      this.#viewer.apresentar(this.#posAtual, conjEmprestimos.length, new EmprestimoDTO(conjEmprestimos[this.#posAtual - 1]));
    }
  }
  
  //-----------------------------------------------------------------------------------------//

  async apresentarPrimeiro() {
    let conjEmprestimos = await this.#daoEmprestimo.obterEmprestimos();
    if(conjEmprestimos.length > 0)
      this.#posAtual = 1;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarProximo() {
    let conjEmprestimos = await this.#daoEmprestimo.obterEmprestimos();
    if(this.#posAtual < conjEmprestimos.length)
      this.#posAtual++;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarAnterior() {
    let conjEmprestimos = await this.#daoEmprestimo.obterEmprestimos();
    if(this.#posAtual > 1)
      this.#posAtual--;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarUltimo() {
    let conjEmprestimos = await this.#daoEmprestimo.obterEmprestimos();
    this.#posAtual = conjEmprestimos.length;
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
 
  async incluir(codigo, dataEmprestimo, dataRetorno) {
    if(this.#status == Status.INCLUINDO) {
      try {
        let emprestimo = new Emprestimo(codigo, dataEmprestimo, dataRetorno);
        await this.#daoEmprestimo.incluir(emprestimo); 
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//
 
  async alterar(codigo, dataEmprestimo, dataRetorno) {
    if(this.#status == Status.ALTERANDO) {
      try {
        let emprestimo = await this.#daoEmprestimo.obterEmprestimoPeloCodigo(codigo); 
        if(emprestimo == null) {
          alert("Emprestimo com o código" + codigo + " não encontrado.");
        } else {
          emprestimo.setDataEmprestimo(dataEmprestimo);
          emprestimo.setDataRetorno(dataRetorno);
          await this.#daoEmprestimo.alterar(emprestimo); 
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
 
  async excluir(codigo) {
    if(this.#status == Status.EXCLUINDO) {
      try {
        let emprestimo = await this.#daoEmprestimo.obterEmprestimoPeloCodigo(codigo); 
        if(emprestimo == null) {
          alert("Emprestimo com o código " + codigo + " não encontrado.");
        } else {
          await this.#daoEmprestimo.excluir(emprestimo); 
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