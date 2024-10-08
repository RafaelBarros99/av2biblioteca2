"use strict";

import Status from "/Status.js";
import Livro from "./Livro.js";
import LivroDTO from "./LivroDTO.js";
import DaoLivro from "./DaoLivro.js";
import ViewerLivro from "./ViewerLivro.js";

export default class CtrlManterLivros {
  
  
  #daoLivro;      
  #viewer;   
  #posAtual; 
  #status;   
  
  //-----------------------------------------------------------------------------------------//

  constructor() {
    this.#daoLivro = new DaoLivro();
    this.#viewer = new ViewerLivro(this);
    this.#posAtual = 1;
    this.#atualizarContextoNavegacao();    
  }
  
  //-----------------------------------------------------------------------------------------//

  async #atualizarContextoNavegacao() {
   
    this.#status = Status.NAVEGANDO;

    
    this.#viewer.statusApresentacao();
    
    
    let conjLivros = await this.#daoLivro.obterLivros();
    
    
    if(conjLivros.length == 0) {
      
      this.#posAtual = 0;
      
      
      this.#viewer.apresentar(0, 0, null);
    }
    else {
      
      if(this.#posAtual == 0 || this.#posAtual > conjLivros.length)
        this.#posAtual = 1;
      
      this.#viewer.apresentar(this.#posAtual, conjLivros.length, new LivroDTO(conjLivros[this.#posAtual - 1]));
    }
  }
  
  //-----------------------------------------------------------------------------------------//

  async apresentarPrimeiro() {
    let conjLivros = await this.#daoLivro.obterLivros();
    if(conjLivros.length > 0)
      this.#posAtual = 1;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarProximo() {
    let conjLivros = await this.#daoLivro.obterLivros();
    if(this.#posAtual < conjLivros.length)
      this.#posAtual++;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarAnterior() {
    let conjLivros = await this.#daoLivro.obterLivros();
    if(this.#posAtual > 1)
      this.#posAtual--;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarUltimo() {
    let conjLivros = await this.#daoLivro.obterLivros();
    this.#posAtual = conjLivros.length;
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
 
  async incluir(id, titulo, edicao, genero, palavraChave, autor) {
    if(this.#status == Status.INCLUINDO) {
      try {
        let livro = new Livro(id, titulo, edicao, genero, palavraChave, autor);
        await this.#daoLivro.incluir(livro); 
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//
 
  async alterar(id, titulo, edicao, genero, palavraChave, autor) {
    if(this.#status == Status.ALTERANDO) {
      try {
        let livro = await this.#daoLivro.obterLivroPeloId(id); 
        if(livro == null) {
          alert("Livro com a id " + id + " não encontrado.");
        } else {
          livro.setTitulo(titulo);
          livro.setEdicao(edicao);
          livro.setGenero(genero);
          livro.setPalavraChave(palavraChave);
          livro.setAutor(autor);
          await this.#daoLivro.alterar(livro); 
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
 
  async excluir(id) {
    if(this.#status == Status.EXCLUINDO) {
      try {
        let livro = await this.#daoLivro.obterLivroPeloId(id); 
        if(livro == null) {
          alert("Livro com a id " + id + " não encontrado.");
        } else {
          await this.#daoLivro.excluir(livro); 
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

