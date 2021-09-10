// Declaración de variables necesarias para el proceso del código
let user;
let instSelected;
let qty = 0;
// Función para depositar fondos en la cuenta
function deposit(e) {
  e.preventDefault()
  let money = parseInt($('#money').val())

  if (user.balance === undefined) {
    user.balance = money
  } else {
    user.balance += money
  }
    
  $('#money').val('')
  // Mostrar en pantalla el saldo del usuario   
  showBalance(user)
}
// Función para encontrar el instrumento que seleccionó el usuario
function findInstrument() {
  let URLJSON = '/data/instruments.json'
  let selection = $('#bInstrument').val()

  $.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;    
      instSelected = misDatos.find(element => element.id == selection)
    }
  });
}
/* Función para generar un objeto de la clase Operations y guardarla en el array wallet
del usuario*/
function operation(instrument, qty, price, value, user) {
  let date = new Date()
  let formDate = formatDate(date)
  let type = instrument.type
  let addRecord = new Summary(formDate, type, instrument, qty, price, value)
  let addOperation = new Operations(instrument, qty, price, value)

  user.updateRecord(addRecord)
  user.updateWallet(addOperation)
}
// Función para validar los datos ingresados en compra
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
      showRecord(user.record)
    } else {
      alert(`Saldo insuficiente`)
    }
  }
  $('#bInstrument').val('')
  $('#qty').val('')
  $('#bPrice').val('')
}
// Función flecha para filtrar el historial de transacciones por fecha
const filterAbstract = (record) => { 
    let dateArrangedAbstract = record.sort((a, b) => b.date - a.date)
    showRecord(dateArrangedAbstract)
}
  