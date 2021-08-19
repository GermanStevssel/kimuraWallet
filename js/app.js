// Declaración de variables necesarias para el proceso del código
let user;
let instSelected;
let qty = 0;
// Array que contendra las ofertas de instrumentos financieros
const INST_CATALOGUE = []
//Generando instancias de Instrument
const BTC = new Instrument(1, "Cryptocurrency", "BTC", 43215);
const ETH = new Instrument(2, "Cryptocurrency", "ETH", 2200);
const AAPL = new Instrument(3, "Stock", "AAPL", 146.14);
const MSFT = new Instrument(4, "Stock", "MSFT", 289.46);
// Pusheando los objetos al array de catalogo de instrumentos financieros
INST_CATALOGUE.push(BTC, ETH, AAPL, MSFT)
console.log(INST_CATALOGUE)
// Función flecha para crear un nuevo usuario
const createUser = () => {
	let name = prompt("Ingrese su nombre");
	let lastName = prompt("Ingrese su apellido");
	let dni = parseInt(prompt("Ingrese su DNI"));

	while (isNaN(dni)) {
		alert("Ha ingresado un valor invalido");
		dni = parseInt(prompt("Ingrese su DNI"));
	}

	let balance = parseFloat(prompt("Ingrese el depósito de dinero"));

	while (isNaN(balance)) {
		alert("Ha ingresado un valor inválido");
		balance = parseFloat(prompt("Ingrese el depósito de dinero"));
	}

	user = new Client(dni, name, lastName, balance);

  showUser(user)
};
// Función para encontrar el instrumento que seleccionó el usuario
function findInstrument(instIndex) {
  instSelected = INST_CATALOGUE.find(element => element.id == instIndex);
  
  return instSelected;
}
// Función flecha para seleccionar la cantidad de unidades a comprar
const setQuantity= (instrument) => {
  // Solicito al usuario la cantidad de unidades que desea comprar
  qty = parseInt(prompt(`¿Cuántas unidades de ${instrument.ticker} quieres comprar?`))
  // Validación del valor ingresado en qty, debe ser un valor númerico
  while (isNaN(qty)) {
    alert("Ha ingresado un valor inválido");
    qty = parseInt(prompt("Ingrese las unidades que desea comprar"));
  }

  return qty;
}
/* Función para generar un objeto de la clase Operations y guardarla en el array wallet
del usuario*/
function operation(instrument, qty, price, value, user) {
  let date = new Date()
  let add = new Operations(date, instrument, qty, price, value)

  user.updateWallet(add)
}
// Función para realizar la compra del instrumento seleccionado
function buy(balance) { //Solicita el instrumento que desea comprar
	let userSelection = prompt(`¿Qué desea comprar?\n
                          1-BTC | 2-ETH | 3-AAPL | 4-MSFT\n
                          Indique con el número identificador`);
  // Validación del valor ingresado
  while (userSelection > INST_CATALOGUE.length || userSelection <= 0) {
    alert("El número ingresado no corresponde a ningúna opción");
    userSelection = prompt(`¿Qué desea comprar?\n
                          1-BTC | 2-ETH | 3-AAPL | 4-MSFT\n
                          Indique con el número identificador`);
  }
  /*Invocar la función findInstrument() para asignar el objeto del instrumento 
  a comprar a la variable instSelected*/
  let instSelected = findInstrument(userSelection);
  
  qty = setQuantity(instSelected)

  let price = instSelected.price
  let value = qty * price;

  if (balance >= value) { 
    if (qty == 1) {
      alert(`Felicitaciones, has comprado ${qty} unidad de ${instSelected.ticker}`)
      user.updateBalance(value)
      operation(instSelected, qty, price, value, user)
    } else {
      alert(`Felicitaciones, has comprado ${qty} unidades de ${instSelected.ticker}`)
      user.updateBalance(value)
      operation(instSelected, qty, price, value, user)
    }
  } else {
    alert(`Saldo insuficiente`)
  }
}
// Función flecha para mostrar el historial de transacciones
const abstract = (record) => { // Consulta si desea visualizar
  let check = confirm(`¿Desea controlar su historial de transacciones?`)

  if (check) {
    let order = prompt(`¿Quiere observarlo ordenado de mayor a menor por monto?
    Si / No`).toLowerCase();

    if (order === "si") {
      let arrangedWallet = record.sort((a, b) => b.value - a.value)
      console.log(`Puede ver su extracto a continuación: `, arrangedWallet)
    } else {
      console.log(`Puede ver su extracto ordenado cronologicamente a continuación: `, record);
    }
  } else {
    alert(`Puede continuar realizando distintas operaciones desde su cuenta.`)
  }
}
// Función principal que ejecutara el programa
function main() { // Solicita al usuario si desea abrir una cuenta
	let abrirCuenta = confirm(`Bienvenido a Kimura. \n
          ¿Desea crear una cuenta?`);
  // En caso de aceptar, continua el código con las siguientes funciones
	if (abrirCuenta) {
    let keepBuying = true; // Variable auxiliar para controlar el ciclo while
		createUser(); // Invocación de la función para generar un nuevo usuario
    let balance = user.balance; // Asignación a variable balance, el saldo del usuario
    // Ciclo while para generar varias instancias de compras
    while (keepBuying) {
      buy(balance) // Invocación de la función de comprar instrumentos financieros
      // Control de flujo de código en función del saldo del usuario
      if (balance > 0) {
        keepBuying = confirm(`Su saldo es de ${user.balance}
        ¿Desea continuar comprando?`)
      } else {
        alert("Su saldo es de $0")
      }
    }
    // Invocación de función abstract, para mostrar el historial de transacciones
    abstract(user.wallet)
	} else { // En caso de no desear abrir una cuenta, se ejecuta este mensaje
		alert("Puede abrir su cuenta en el momento que usted quiera.");
	}
}
// Invocación de función principal para que se ejecute todo el código
main();

let totalElement = document.getElementById("total");

let total = document


console.log(user);
console.log(user.balance)
console.log(user.wallet)