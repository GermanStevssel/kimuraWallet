// Función para mostrar el nombre del usuario en el html
function showUser(user) {
  let userHTML = document.getElementById("user")
  userHTML.innerHTML = `${user.nameDisplayed()} Wallet`;
}

function removeChilds(element) {
  if (element.is(':parent')) {
    // while (element.childNodes.length >= 1) {
    //   element.removeChild(element.firstChild)
    // }
    element.empty()
  }
}

function showBalance(user) {
  let value = 0
  // iterar por todos los objetos dentro de wallet y sumar los montos de compra
  for (let i = 0; i < user.wallet.length; i++) {
    value += user.wallet[i].value
    console.log(user.wallet[i].value)
  }

  let total = value + user.balance
  const BALANCE = [total, value, user.balance]
  // let amounts = document.getElementById('amounts')
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
  let modal = document.querySelector(el)
  modal.classList.add('show')
}

function hideModal(e) {
  let modal = document.querySelector('.overlay')
  let dModal = document.querySelector('.dOverlay')
  let bModal = document.querySelector('.bOverlay')

  if (e.target === modal ||
      e.target === dModal ||
      e.target === bModal) {  
    e.target.classList.remove('show')
  }
}

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