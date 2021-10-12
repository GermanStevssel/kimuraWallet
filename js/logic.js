// Declaración de variables necesarias para el proceso del código
let user;
let instSelected;
let qty = 0;
// Función para formatear las fechas 
function formatDate(date) {
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let hour = date.getHours()
  let min = date.getMinutes()

  if (min < 10) {
    min = "0"+ min
  }

  date = `${day}/${month}/${year} - ${hour}:${min}`

  return date
}
// Formatear números a moneda
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});
// Función para redondear a 2 decimales
function roundTwoDecimals(num) {
  num = num * 100;
  num = Math.round(num);
  num = num / 100;
  return num;
}
// Función para depositar fondos en la cuenta
function deposit(e) {
  e.preventDefault()
  let money = roundTwoDecimals(parseInt($('#depMoney').val()))

  if ($('#depMoney').val() != '') {
    if (user.balance === undefined) {
      user.balance = money
    } else {
      user.balance += money
    }

    showBalance(user)
  }

  $('#depMoney').val('')  
}
// Función para retirar fondos en la cuenta
function withdraw(e) {
  e.preventDefault()
  let money = parseInt($('#witMoney').val())

  if ($('#witMoney').val() != '') {
    if (money > user.balance || user.balance === undefined) {
      showMessage('.wMessage')
    } else {
      user.balance -= money
      showBalance(user)
    }
  }

  $('#witMoney').val('')  
}
// Función para encontrar el instrumento que seleccionó el usuario
function findInstrument() {
  let URLJSON = 'https://germanstevssel.github.io/apiInstruments/db.json'
  let selection = $(this).val()

  if (this.id == 'bInstrument') {
    $.get(URLJSON, function (respuesta, estado) {
      if(estado === "success"){
        let misDatos = respuesta;    
        instSelected = misDatos.find(element => element.id == selection)
      }
    })
  } else {
    instSelected = user.wallet.find(element => element.id == selection)
  }
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
function validateBuy() {
  let bQty = $('#bQty').val()

  if (bQty === '' || 
      isNaN(bQty) || 
      bQty <= 0) {
    showMessage('.buyQtyMessage');
    continueBuy = false;
    $('#bQty').val('');
  } else {
    continueBuy = true;
  }
}
// Función para validar los datos ingresados en venta
function validateSell() {
  let sQty = $('#sQty').val()

  if (sQty === '' ||
      isNaN(sQty) ||
      sQty <= 0) {
    showMessage('.sellQtyMessage');
    continueSell = false
    $('#sQty').val('');
  } else {
    continueSell = true
  }
}
// Función para realizar la compra del instrumento seleccionado
function buy(e) {
  e.preventDefault()
  validateBuy()

  if (continueBuy) { 
    qty = parseInt($('#bQty').val())
    let price = $('#bPrice').val()
    let balance = user.balance
    let value = roundTwoDecimals(qty * price)

    if (balance >= value) { 
      if (qty == 1) {
        appendMessage(qty, instSelected, '.buyMessage')
        user.updateBalance(value)
      } else {
        appendMessage(qty, instSelected, '.buyMessage')
        user.updateBalance(value)
      }

      operation(instSelected, qty, price, value, user)
      showInstruments(user)
      showBalance(user)
      showRecord(user.record)
    } else {
      showMessage('.balanceMessage')
    }
  }

  $('#bInstrument').val('')
  $('#bQty').val('')
  $('#bPrice').val('')
}
// Función para realizar la venta del instrumento seleccionado
function sell(e) {
  e.preventDefault()
  validateSell()

  if (continueSell) {
    qty = -parseInt($('#sQty').val())
    let price = $('#sPrice').val()
    let qtyAvail = instSelected.qty
    let value = roundTwoDecimals(qty * price)

    if (-qty <= qtyAvail) {
      if (qty == 1) {
        appendMessage(qty, instSelected, '.sellMessage')
        user.updateBalance(value)
      } else {
        appendMessage(qty, instSelected, '.sellMessage')
        user.updateBalance(value)
      }

      operation(instSelected, qty, price, value, user)

      if (instSelected.qty == 0) {
        let id = instSelected.id
        let index = 0
        
        user.wallet.forEach(element => {
          if (element.id == id) {
            index = user.wallet.indexOf(element)
          }
        })

        user.wallet.splice(index, 1)
      }

      showInstruments(user)
      showBalance(user)
      showRecord(user.record)
    } else {
      showMessage('.noQtyMessage')
    }
  }

  $('#sInstrument').val('')
  $('#sQty').val('')
  $('#sPrice').val('')
}
// Función para mostrar solo criptomonedas en historial
function filterAbstract(sel) {
let record = user.record

  if (sel == 'todo') {
    showRecord(record)
  } else {
    let recordFilter = record.filter(element => element.type == sel)
    showRecord(recordFilter)
  }
}
// Función para ordenar el historial
function arrangedRecord(sel) {
  let record = user.record
  let recordArranged

    if (sel == 'fecha') {
      showRecord(record)
    } else if (sel == "mayor") {
      // Duplico el array con .slice() para no modificar el original con .sort()
      recordArranged = record.slice(0).sort((a, b) => b.value - a.value)
      showRecord(recordArranged)
    } else {
      recordArranged = record.slice(0).sort((a, b) => a.value - b.value)
      showRecord(recordArranged)
    }
}