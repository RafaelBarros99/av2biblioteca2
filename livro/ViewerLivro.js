import Status from "/Status.js";
import Livro from "./LivroDTO.js";
import ViewerError from "/ViewerError.js";

//------------------------------------------------------------------------//

export default class ViewerLivro {

  #ctrl;
  
  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.divNavegar  = this.obterElemento('divNavegar'); 
    this.divComandos = this.obterElemento('divComandos'); 
    this.divAviso    = this.obterElemento('divAviso'); 
    this.divDialogo  = this.obterElemento('divDialogo');

    this.btPrimeiro  = this.obterElemento('btPrimeiro');
    this.btAnterior  = this.obterElemento('btAnterior');
    this.btProximo   = this.obterElemento('btProximo');
    this.btUltimo    = this.obterElemento('btUltimo');

    this.btIncluir   = this.obterElemento('btIncluir');
    this.btExcluir   = this.obterElemento('btExcluir');
    this.btAlterar   = this.obterElemento('btAlterar');
    this.btSair      = this.obterElemento('btSair');

    this.btOk        = this.obterElemento('btOk');
    this.btCancelar  = this.obterElemento('btCancelar');

    this.tfId = this.obterElemento('tfId');
    this.tfTitulo       = this.obterElemento('tfTitulo');
    this.tfEdicao      = this.obterElemento('tfEdicao');
    this.tfGenero     = this.obterElemento('tfGenero');
    this.tfPalavraChave  = this.obterElemento('tfPalavraChave');
    this.tfAutor  = this.obterElemento('tfAutor');
      
    this.btPrimeiro.onclick = fnBtPrimeiro; 
    this.btProximo.onclick = fnBtProximo; 
    this.btAnterior.onclick = fnBtAnterior; 
    this.btUltimo.onclick = fnBtUltimo; 

    this.btIncluir.onclick = fnBtIncluir; 
    this.btAlterar.onclick = fnBtAlterar; 
    this.btExcluir.onclick = fnBtExcluir; 

    this.btOk.onclick = fnBtOk; 
    this.btCancelar.onclick = fnBtCancelar; 
  }

//------------------------------------------------------------------------//

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if(elemento == null) 
      throw new ViewerError("Não encontrei um elemento com id '" + idElemento + "'");
    // Adicionando o atributo 'viewer' no elemento do Viewer. Isso permitirá
    // que o elemento guarde a referência para o objeto Viewer que o contém.
    elemento.viewer = this;
    return elemento;
  }

//------------------------------------------------------------------------//
  
  getCtrl() { 
    return this.#ctrl;
  }

//------------------------------------------------------------------------//
  
  apresentar(pos, qtde, livro) {    
    
    this.configurarNavegacao( pos <= 1 , pos == qtde );   

    if(livro == null) {
      this.tfId.value = "";
      this.tfTitulo.value       = "";
      this.tfEdicao.value      = "";
      this.tfGenero.value     = "";
      this.tfPalavraChave.value  = "";
      this.tfAutor.value  = "";
      this.divAviso.innerHTML = " Número de Livros: 0";
    } else {
      this.tfId.value = livro.getId();
      this.tfTitulo.value       = livro.getTitulo();
      this.tfEdicao.value      = livro.getEdicao();
      this.tfGenero.value     = livro.getGenero();
      this.tfPalavraChave.value  = livro.getPalavraChave();
      this.tfAutor.value  = livro.getAutor();
      this.divAviso.innerHTML = "Posição: " + pos + " | Número de Livros: " + qtde;
    }
  }

//------------------------------------------------------------------------//

  configurarNavegacao(flagInicio, flagFim) {
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled   = flagFim;
    this.btProximo.disabled  = flagFim;
    this.btAnterior.disabled = flagInicio;
  }
  
//------------------------------------------------------------------------//
  
  statusEdicao(operacao) { 
    this.divNavegar.hidden = true;
    this.divComandos.hidden = true;
    this.divDialogo.hidden = false; 
    
    if(operacao != Status.EXCLUINDO) {
      this.tfTitulo.disabled = false;
      this.tfEdicao.disabled = false;
      this.tfGenero.disabled = false;
      this.tfPalavraChave.disabled = false;
      this.tfAutor.disabled = false;
      this.divAviso.innerHTML = "";      
    } else {
      this.divAviso.innerHTML = "Deseja excluir este registro?";      
    }
    if(operacao == Status.INCLUINDO) {
      this.tfId.disabled = false;
      this.tfId.value = "";
      this.tfTitulo.value = "";
      this.tfEdicao.value = "";
      this.tfGenero.value = "";
      this.tfPalavraChave.value = "";
      this.tfAutor.value = "";
    }
  }

//------------------------------------------------------------------------//
  
  statusApresentacao() { 
    this.tfTitulo.disabled = true;
    this.divNavegar.hidden = false;
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true; 
    this.tfId.disabled = true;
    this.tfTitulo.disabled = true;
    this.tfEdicao.disabled = true;
    this.tfGenero.disabled = true;
    this.tfPalavraChave.disabled = true;
    this.tfAutor.disabled = true;
  }

}

//------------------------------------------------------------------------//

function fnBtPrimeiro() {
  
  this.viewer.getCtrl().apresentarPrimeiro();
  
}

//------------------------------------------------------------------------//

function fnBtProximo() {
  
  this.viewer.getCtrl().apresentarProximo();
  
}

//------------------------------------------------------------------------//

function fnBtAnterior() {
  
  this.viewer.getCtrl().apresentarAnterior();
  
}

//------------------------------------------------------------------------//

function fnBtUltimo() {
  
  this.viewer.getCtrl().apresentarUltimo();
  
}
//------------------------------------------------------------------------//

function fnBtIncluir() {
  
  this.viewer.getCtrl().iniciarIncluir();
}

//------------------------------------------------------------------------//

function fnBtAlterar() {
  
  this.viewer.getCtrl().iniciarAlterar();
  
}

//------------------------------------------------------------------------//

function fnBtExcluir() {
  
  this.viewer.getCtrl().iniciarExcluir();
}

//------------------------------------------------------------------------//

function fnBtOk() {
  const id = this.viewer.tfId.value;
  const titulo = this.viewer.tfTitulo.value;
  const edicao = this.viewer.tfEdicao.value;
  const genero = this.viewer.tfGenero.value;
  const palavraChave = this.viewer.tfPalavraChave.value;
  const autor = this.viewer.tfAutor.value;
    

  this.viewer.getCtrl().efetivar(id, titulo, edicao, genero, palavraChave, autor); 

}

//------------------------------------------------------------------------//

function fnBtCancelar() {
  this.viewer.getCtrl().cancelar(); 
}

//------------------------------------------------------------------------//