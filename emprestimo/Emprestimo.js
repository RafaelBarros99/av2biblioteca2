import ModelError from "/ModelError.js";

export default class Emprestimo {
    
  //-----------------------------------------------------------------------------------------//

  constructor(codigo, dataEmprestimo, dataRetorno) {
    this.setCodigo(codigo);
    this.setDataEmprestimo(dataEmprestimo);
    this.setDataRetorno(dataRetorno);
  }
  
  //-----------------------------------------------------------------------------------------//

  getCodigo() {
    return this.codigo;
  }
  
  //-----------------------------------------------------------------------------------------//

  setCodigo(codigo) {
    if(!Emprestimo.validarCodigo(codigo))
      throw new ModelError("Codigo Inválido: " + codigo);
    this.codigo = codigo;
  }
  
  //-----------------------------------------------------------------------------------------//

  getDataEmprestimo() {
    return this.dataEmprestimo;
  }
  
  //-----------------------------------------------------------------------------------------//

  setDataEmprestimo(dataEmprestimo) {
    if(!Emprestimo.validarDataEmprestimo(dataEmprestimo))
      throw new ModelError("Data de Emprestimo Inválida: " + dataEmprestimo);
    this.dataEmprestimo = dataEmprestimo;
  }
  
  
  //-----------------------------------------------------------------------------------------//

 getDataRetorno() {
    return this.dataRetorno;
  }
  
  //-----------------------------------------------------------------------------------------//

  setDataRetorno(dataRetorno) {
    if(!Emprestimo.validarDataRetorno(dataRetorno))
      throw new ModelError("Data de Retorno Inválida: " + dataRetorno);
    this.dataRetorno = dataRetorno;
  }
  
  //-----------------------------------------------------------------------------------------//

  static validarCodigo(codigo){
    if(codigo == null || codigo == "" || codigo == undefined)
      return false;
    
    if (codigo.length < 1) 
      return false;
    
    const padraoCodigo = /[0-9]/;
    if (!padraoCodigo.test(codigo))
      return false;
    
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarDataEmprestimo(dataEmprestimo) {
    if(dataEmprestimo == null || dataEmprestimo == "" || dataEmprestimo == undefined)
      return false;
    
    const padraoDataEmprestimo = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;;
    if (!padraoDataEmprestimo.test(dataEmprestimo)) 
      return false;
    return true;
  }
  
  //-----------------------------------------------------------------------------------------//

  static validarDataRetorno(dataRetorno) {
    if(dataRetorno == null || dataRetorno == "" || dataRetorno == undefined)
      return false;
    
    const padraoDataRetorno = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;;
    if (!padraoDataRetorno.test(dataRetorno)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

   mostrar() {
    let texto = "Codigo: " + this.codigo + "\n";
    texto += "Data de Emprestimo: " + this.dataEmprestimo + "\n";
    texto += "Data de Retorno: " + this.dataRetorno + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}