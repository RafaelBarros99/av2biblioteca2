import ModelError from "/ModelError.js";

export default class Cliente {
    
  //-----------------------------------------------------------------------------------------//

  constructor(cpf, nome, email) {
    this.setCpf(cpf);
    this.setNome(nome);
    this.setEmail(email);
  }
  
  //-----------------------------------------------------------------------------------------//

  getCpf() {
    return this.cpf;
  }
  
  //-----------------------------------------------------------------------------------------//

  setCpf(cpf) {
    if(!Cliente.validarCpf(cpf))
      throw new ModelError("Cpf Inválido: " + cpf);
    this.cpf = cpf;
  }
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    if(!Cliente.validarNome(nome))
      throw new ModelError("Nome Inválido: " + nome);
    this.nome = nome;
  }
  
  
  //-----------------------------------------------------------------------------------------//

 getEmail() {
    return this.email;
  }
  
  //-----------------------------------------------------------------------------------------//

  setEmail(email) {
    if(!Cliente.validarEmail(email))
      throw new ModelError("Email inválido: " + email);
    this.email = email;
  }
  
  //-----------------------------------------------------------------------------------------//


  static validarCpf(cpf){
    if(cpf == null || cpf == "" || cpf == undefined)
      return false;
    
    if (cpf.length != 11) 
      return false;
    
    const padraoCpf = /[0-9]/;
    if (!padraoCpf.test(cpf))
      return false;
    
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      return false;
    
    const padraoNome = /[A-Z][a-z]*/;
    if (!padraoNome.test(nome)) 
      return false;
    return true;
  }
  
  //-----------------------------------------------------------------------------------------//

  static validarEmail(email) {
    if(email == null || email == "" || email == undefined)
      return false;
    
    const padraoEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    if (!padraoEmail.test(email)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

   mostrar() {
    let texto = "Cpf: " + this.cpf + "\n";
    texto += "Nome: " + this.nome + "\n";
    texto += "Email: " + this.email + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}