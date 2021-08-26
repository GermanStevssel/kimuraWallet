function deposit(e) {
  e.preventDefault()

  let money = $('#money').val()
  user.balance = money
  
  showBalance(user)
}

let bBtn = document.getElementById('buyBtn')
let dOverlay = document.querySelector('.dOverlay')
let bOverlay = document.querySelector('.bOverlay')
let confirmBtn = document.getElementById('bConfirm')

let logUser = JSON.parse(localStorage.getItem('user'))
let dni = logUser.dni
let name = logUser.name
let lastName = logUser.lastName
let email = logUser.email

user = new Client(dni, name, lastName, email) 

showUser(user)

$('#deposit').click(() => {
  showModal('.dOverlay')
})
$('#dConfirm').click(deposit)
confirmBtn.addEventListener('click', buy)
bBtn.addEventListener('click', () => {
  showModal('.bOverlay')})
dOverlay.addEventListener('click', hideModal)
bOverlay.addEventListener('click', hideModal)
