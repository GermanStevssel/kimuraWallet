function removeChilds(element) {
  if (element.is(':parent')) {
    element.empty()
  }
}

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

// Función para mostrar el nombre del usuario en el html
function showUser(user) {
  let userHTML = $('#user')
  userHTML.html(`${user.nameDisplayed()} Wallet`);
}

function showBalance(user) {
  let value = 0
  // iterar por todos los objetos dentro de wallet y sumar los montos de compra
  for (let i = 0; i < user.wallet.length; i++) {
    value += user.wallet[i].value
  }

  let total = value + user.balance
  const BALANCE = [total, value, user.balance]
  let amounts = $('#amount')  
  // Si ya se genero el balance, elimino y vuelvo a generar los elementos con la info actualizada
  removeChilds(amounts)
  // Genero el tablero con los datos del balance
  for (const item of BALANCE) {
    let div = $("<div>")
    div.addClass("values")
    div.html(`<p>${item}</p>`)
    $(".amounts").append(div)
  }
}

function showModal(el) {
  let modal = $(el)
  modal.addClass('show')
}

function hideModal(e) {
  let modal = $('.overlay')[0] // Accedo al primer elemento del objeto generado por JQuery
  let dModal = $('.dOverlay')[0]
  let bModal = $('.bOverlay')[0]
  let sModal = $('.sOverlay')[0]

  if (e.target === modal ||
      e.target === dModal ||
      e.target === bModal ||
      e.target === sModal) {  
    e.target.classList.remove('show')
  }
}
//Mostrar cartera de instrumentos
function showInstruments(user) {
  let instruments = $('#instruments')
  let wallet = user.wallet
  
  removeChilds(instruments)

  let header = $("<div>")
  header.addClass("header")
  header.html(`<div class="instCol"><p>Nombre</p></div>
    <div class="instCol"><p>Ticker</p></div>
    <div class="instCol"><p>Cantidad</p></div>
    <div class="instCol"><p>Precio</p></div>
    <div class="instCol"><p>Valor</p></div>`
  )
  instruments.append(header)

  wallet.forEach(element => {
    let div = $("<div>")
    div.addClass("instRow")
    div.html(`<div class="instCol"><p>${element.name}</p></div>
      <div class="instCol"><p>${element.ticker}</p></div>
      <div class="instCol"><p>${element.qty}</p></div>
      <div class="instCol"><p>${element.price}</p></div>
      <div class="instCol"><p>${element.value}</p></div>`
    )
    instruments.append(div)
  });
}
//Mostrar historial de operaciones
function showRecord(record) {
  let recCont = $('#recCont')
    
  removeChilds(recCont)

  let header = $("<div>")
  header.addClass("header")
  header.html(`<div class="instCol"><p>Fecha</p></div>
    <div class="instCol"><p>Especie</p></div>
    <div class="instCol"><p>Nombre</p></div>
    <div class="instCol"><p>Ticker</p></div>
    <div class="instCol"><p>Cantidad</p></div>
    <div class="instCol"><p>Precio</p></div>
    <div class="instCol"><p>Valor</p></div>`
  )
  recCont.append(header)

  record.forEach(element => {
    let items = $("<div>")
    items.addClass("instRow")
    items.html(`<div class="instCol"><p>${element.date}</p></div>
      <div class="instCol"><p>${element.type}</p></div>
      <div class="instCol"><p>${element.name}</p></div>
      <div class="instCol"><p>${element.ticker}</p></div>
      <div class="instCol"><p>${element.qty}</p></div>
      <div class="instCol"><p>${element.price}</p></div>
      <div class="instCol"><p>${element.value}</p></div>`
    )
    recCont.append(items)
  });
}

// Animación para mostrar sidebar
$('.navToggleBtn').click(function () {
	$('.nav').toggleClass("mostrar");
  $('.pageContainer').toggleClass('pageContWidth');
  $('.navToggleBtn').toggleClass('rotate')
  $('.navTitle').toggle()
});

// Cargar el precio del producto seleccionado
$('#bInstrument').change(() => {
  let URLJSON = '/data/instruments.json'
  let selection = $('#bInstrument').val()

  $.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;    
      let instrument = misDatos.find(element => element.id == selection)
      let price = instrument.price
      $('#bPrice').val(price)   
    }
  });
})