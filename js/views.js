// Función para mostrar el nombre del usuario en el html
function showUser(user) {
  let userHTML = document.getElementById("user")
  userHTML.innerHTML = `${user.nameDisplayed()} Wallet`;
}

function removeChilds(element) {
  if (element.hasChildNodes()) {
    while (element.childNodes.length >= 1) {
      element.removeChild(element.firstChild)
    }
  }
}

function showBalance(user) {
  let value = 0
  // iterar por todos los objetos dentro de wallete y sumar los montos de compra
  for (let i = 0; i < user.wallet.length; i++) {
    value += user.wallet[i].value
    console.log(user.wallet[i].value)
  }

  let total = value + user.balance
  let i = 0
  const balance = [total, value, user.balance]

  let disponibilidades = document.getElementsByClassName("disponibilidades")
  let dispo = document.getElementById('dispo')
  let definitions = ["Total:", "Instrumentos:", "Disponible:"]
  // Si ya se genero el balance, elimino y vuelvo a generar los elementos con la info actualizada
  removeChilds(dispo)
  // Genero el tablero con los datos del balance
  for (const item of balance) {
    let contenedor = document.createElement("div")
    contenedor.className = "balance-items"
    let text = document.createTextNode(`${definitions[i]} $${item}`)
    contenedor.appendChild(text)
    disponibilidades[0].appendChild(contenedor)
    i++
  }
}

function showModal() {
  let modal = document.getElementById('modal')
  modal.classList.add('show')
}

function hideModal(e) {
  let modal = document.getElementById('modal')

  if (e.target === modal) {  
    modal.classList.remove('show')
  }
}

function showInstruments(user) {
  let instruments = document.getElementById('instruments')
  let wallet = user.wallet
  
  removeChilds(instruments)

  wallet.forEach(element => {
    instruments.innerHTML += `Tiene ${element.qty} unidades de ${element.name} por un valor de $${element.value}<br/>`
  });
}