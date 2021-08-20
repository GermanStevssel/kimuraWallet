// Función para mostrar el nombre del usuario en el html
function showUser(user) {
  let userHTML = document.getElementById("user")
  userHTML.innerHTML = `${user.nameDisplayed()} Wallet`;
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
  let definitions = ["Total:", "Instrumentos:", "Disponible:"]
  
  for (const item of balance) {
    let contenedor = document.createElement("div")
    contenedor.className = "balance-items"
    let text = document.createTextNode(`${definitions[i]} $${item}`)
    contenedor.appendChild(text)
    disponibilidades[0].appendChild(contenedor)
    i++
  }
}