// Declaración de variables necesarias para el proceso del código
let user;
let instSelected;
let qty = 0;
// Array que contendra las ofertas de instrumentos financieros
const INST_CATALOGUE = []
//Generando instancias de Instrument
const BTC = new Instrument(1, "Cryptocurrency", "Bitcoin", "BTC", 43215);
const ETH = new Instrument(2, "Cryptocurrency", "Ethereum", "ETH", 2200);
const AAPL = new Instrument(3, "Stock", "Apple", "AAPL", 146.14);
const MSFT = new Instrument(4, "Stock", "Microsoft", "MSFT", 289.46);
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
  showBalance(user)
};
// Función para encontrar el instrumento que seleccionó el usuario
function findInstrument(instIndex) {
  instSelected = INST_CATALOGUE.find(element => element.id == instIndex);
  
  return instSelected;
}
/* Función para generar un objeto de la clase Operations y guardarla en el array wallet
del usuario*/
function operation(instrument, qty, price, value, user) {
  let date = new Date()
  let add = new Operations(date, instrument, qty, price, value)

  user.updateWallet(add)
}

function validateForm() {
  qty = document.getElementById('qty').value

  if (qty === '' || isNaN(qty)) {
    alert(`Ha ingresado una cantidad invalida`);
    continueBuying = false;
    document.getElementById('qty').value = '';
  } else {
    continueBuying = true;
  }
}
// Función para realizar la compra del instrumento seleccionado
function buy(e) {
  e.preventDefault()
  validateForm()

  if (continueBuying) {
    let userSelection = document.getElementById('instrument').value
    /*Invocar la función findInstrument() para asignar el objeto del instrumento 
    a comprar a la variable instSelected*/
    instSelected = findInstrument(userSelection)
    qty = parseInt(document.getElementById('qty').value)
    let price = instSelected.price
    let balance = user.balance
    let value = qty * price

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

      showInstruments(user)
      showBalance(user)
    } else {
      alert(`Saldo insuficiente`)
    }
  }
  document.getElementById('qty').value = '';
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