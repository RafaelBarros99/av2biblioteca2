import ModelError from "/ModelError.js";

export default class EmprestimoDTO {
    
  //-----------------------------------------------------------------------------------------//

  #codigo;
  #dataEmprestimo;
  #dataRetorno;
  
  constructor(emprestimo) {
    this.#codigo = emprestimo.getCodigo();
    this.#dataEmprestimo = emprestimo.getDataEmprestimo();
    this.#dataRetorno = emprestimo.getDataRetorno();
  }

  //-----------------------------------------------------------------------------------------//

  getCodigo() {
    return this.#codigo;
  }
  
  //-----------------------------------------------------------------------------------------//

  getDataEmprestimo() {
    return this.#dataEmprestimo;
  }
  
  //-----------------------------------------------------------------------------------------//
  
  getDataRetorno() {
    return this.#dataRetorno;
  }
  
  //-----------------------------------------------------------------------------------------//
  
   
  mostrar() {
    let texto = "Codigo: " + this.#codigo + "\n";
    texto += "Data de Emprestimo: " + this.#dataEmprestimo + "\n";
    texto += "Data de Retorno: " + this.#dataRetorno + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}