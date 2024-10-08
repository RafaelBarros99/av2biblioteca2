import ModelError from "/ModelError.js";

export default class LivroDTO {
    
  //-----------------------------------------------------------------------------------------//

  #id;
  #titulo;
  #edicao;
  #genero;
  #palavraChave;
  #autor;
  
  constructor(livro) {
    this.#id = livro.getId();
    this.#titulo = livro.getTitulo();
    this.#edicao = livro.getEdicao();
    this.#genero = livro.getGenero();
    this.#palavraChave = livro.getPalavraChave();
    this.#autor = livro.getAutor();
  }

  //-----------------------------------------------------------------------------------------//

  getId() {
    return this.#id;
  }
  
  //-----------------------------------------------------------------------------------------//

  getTitulo() {
    return this.#titulo;
  }
  
  //-----------------------------------------------------------------------------------------//
  
  getEdicao() {
    return this.#edicao;
  }
  
  //-----------------------------------------------------------------------------------------//
  
  getGenero() {
    return this.#genero;
  }
  
  //-----------------------------------------------------------------------------------------//
  
  getPalavraChave() {
    return this.#palavraChave;
  }
  
  //-----------------------------------------------------------------------------------------//
  
  getAutor() {
    return this.#autor;
  }
  
  //-----------------------------------------------------------------------------------------//
   
  mostrar() {
    let texto = "Id: " + this.#id + "\n";
    texto += "Titulo: " + this.#titulo + "\n";
    texto += "Edição: " + this.#edicao + "\n";
    texto += "Genero: " + this.#genero + "\n";
    texto += "Palavra Chave: " + this.#palavraChave + "\n";
    texto += "Autor: " + this.#autor + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}