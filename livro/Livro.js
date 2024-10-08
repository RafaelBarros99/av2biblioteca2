import ModelError from "/ModelError.js";

export default class Livro {
    
  //-----------------------------------------------------------------------------------------//

  constructor(id, titulo, edicao, genero, palavraChave, autor) {
    this.setId(id);
    this.setTitulo(titulo);
    this.setEdicao(edicao);
    this.setGenero(genero);
    this.setPalavraChave(palavraChave);
    this.setAutor(autor);
  }
  
  //-----------------------------------------------------------------------------------------//

  getId() {
    return this.id;
  }
  
  //-----------------------------------------------------------------------------------------//

  setId(id) {
    if(!Livro.validarId(id))
      throw new ModelError("Id Inválido: " + id);
    this.id = id;
  }
  
  //-----------------------------------------------------------------------------------------//

  getTitulo() {
    return this.titulo;
  }
  
  //-----------------------------------------------------------------------------------------//

  setTitulo(titulo) {
    if(!Livro.validarTitulo(titulo))
      throw new ModelError("Titulo Inválido: " + titulo);
    this.titulo = titulo;
  }
  
  
  //-----------------------------------------------------------------------------------------//

 getEdicao() {
    return this.edicao;
  }
  
  //-----------------------------------------------------------------------------------------//

  setEdicao(edicao) {
    if(!Livro.validarEdicao(edicao))
      throw new ModelError("Edicao inválido: " + edicao);
    this.edicao = edicao;
  }
  
  //-----------------------------------------------------------------------------------------//
  
 getGenero() {
    return this.genero;
  }
  
  //-----------------------------------------------------------------------------------------//

  setGenero(genero) {
    if(!Livro.validarGenero(genero))
      throw new ModelError("Genero inválido: " + genero);
    this.genero = genero;
  }
  
  //-----------------------------------------------------------------------------------------//
  
 getPalavraChave() {
    return this.palavraChave;
  }
  
  //-----------------------------------------------------------------------------------------//

  setPalavraChave(palavraChave) {
    if(!Livro.validarPalavraChave(palavraChave))
      throw new ModelError("Palavra Chave inválida: " + palavraChave);
    this.palavraChave = palavraChave;
  }
  
  //-----------------------------------------------------------------------------------------//
  
 getAutor() {
    return this.autor;
  }
  
  //-----------------------------------------------------------------------------------------//

  setAutor(autor) {
    if(!Livro.validarAutor(autor))
      throw new ModelError("Autor inválido: " + autor);
    this.autor = autor;
  }
  
  //-----------------------------------------------------------------------------------------//


  static validarId(id){
    if(id == null || id == "" || id == undefined)
      return false;
    
    if (id.length < 1) 
      return false;
    
    const padraoId = /[0-9]/;
    if (!padraoId.test(id))
      return false;
    
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarTitulo(titulo) {
    if(titulo == null || titulo == "" || titulo == undefined)
      return false;
    
    const padraoTitulo = /[\s\S]*/;
    if (!padraoTitulo.test(titulo)) 
      return false;
    return true;
  }
  
  //-----------------------------------------------------------------------------------------//

  static validarEdicao(edicao) {
    if(edicao == null || edicao == "" || edicao == undefined)
      return false;
    
    const padraoEdicao = /^[0-9]+ª\s[A-Za-z]+$/;
    if (!padraoEdicao.test(edicao)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//
  
  static validarGenero(genero) {
    if(genero == null || genero == "" || genero == undefined)
      return false;
    
    const padraoGenero = /[A-Z][a-z]*/;
    if (!padraoGenero.test(genero)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//
  
  static validarPalavraChave(palavraChave) {
    if(palavraChave == null || palavraChave == "" || palavraChave == undefined)
      return false;
    
    const padraoPalavraChave = /[A-Z][a-z]*/;
    if (!padraoPalavraChave.test(palavraChave)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//
  
  static validarAutor(autor) {
    if(autor == null || autor == "" || autor == undefined)
      return false;
    
    const padraoAutor = /[A-Z][a-z]*/;
    if (!padraoAutor.test(autor)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

   mostrar() {
    let texto = "Id: " + this.id + "\n";
    texto += "Titulo: " + this.titulo + "\n";
    texto += "Edicao: " + this.edicao + "\n";
    texto += "Genero: " + this.genero + "\n";
    texto += "Palavra Chave: " + this.palavraChave + "\n";
    texto += "Autor: " + this.autor + "\n";
     
    alert(texto);
    alert(JSON.stringify(this));
  }
}