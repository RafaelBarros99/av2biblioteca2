import ModelError from "/ModelError.js";

export default class ClienteDTO {
    
  //-----------------------------------------------------------------------------------------//

  #cpf;
  #nome;
  #email;
  
  constructor(cliente) {
    this.#cpf = cliente.getCpf();
    this.#nome = cliente.getNome();
    this.#email = cliente.getEmail();
  }

  //-----------------------------------------------------------------------------------------//

  getCpf() {
    return this.#cpf;
  }
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.#nome;
  }
  
  //-----------------------------------------------------------------------------------------//
  
  getEmail() {
    return this.#email;
  }
  
  //-----------------------------------------------------------------------------------------//
  
   
  mostrar() {
    let texto = "Cpf: " + this.#cpf + "\n";
    texto += "Nome: " + this.#nome + "\n";
    texto += "Email: " + this.#email + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}