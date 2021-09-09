// Declaración de variables necesarias para el proceso del código
let user;
let instSelected;
let qty = 0;
// Función para depositar fondos en la cuenta
function deposit(e) {
  e.preventDefault()

  let money = parseInt($('#money').val())
  user.balance = money
  $('#money').val('')
  // Mostrar en pantalla el saldo del usuario   
  showBalance(user)
}
// Función para encontrar el instrumento que seleccionó el usuario
function findInstrument(instIndex) {
  let URLJSON = 'data/instruments.json'

  $.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;

      instSelected = misDatos.find(element => element.id == instIndex)   
    }
  });
  
  return instSelected;
}
/* Función para generar un objeto de la clase Operations y guardarla en el array wallet
del usuario*/
function operation(instrument, qty, price, value, user) {
  let date = new Date()
  let formDate = formatDate(date)
  let addRecord = new Summary(formDate, instrument, qty, price, value)
  let addOperation = new Operations(instrument, qty, price, value)

  user.updateRecord(addRecord)
  user.updateWallet(addOperation)
}

function validateForm() {
  qty = $('#qty').val()
  console.log(qty)
  if (qty === '' || isNaN(qty) || qty <= 0) {
    alert(`Ha ingresado una cantidad invalida`);
    continueBuying = false;
    $('#qty').val('') ;
  } else {
    continueBuying = true;
  }
}

// Función para realizar la compra del instrumento seleccionado
function buy(e) {
  e.preventDefault()
  validateForm()

  if (continueBuying) { 
    qty = parseInt($('#qty').val())
    let price = $('#bPrice').val()
    let balance = user.balance
    let value = qty * price
    console.log(qty)
    if (balance >= value) { 
      if (qty == 1) {
        alert(`Felicitaciones, has comprado ${qty} unidad de ${instSelected.ticker}`)
        user.updateBalance(value)
      } else {
        alert(`Felicitaciones, has comprado ${qty} unidades de ${instSelected.ticker}`)
        user.updateBalance(value)
      }

      operation(instSelected, qty, price, value, user)
      showInstruments(user)
      showBalance(user)
      showRecord(user)
    } else {
      alert(`Saldo insuficiente`)
    }
  }
  $('#bInstrument').val('')
  $('#qty').val('')
  $('#bPrice').val('')
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