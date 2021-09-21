function signUp(e) {
  e.preventDefault()

  let name = document.getElementById('name').value
  let lastName = document.getElementById('lastName').value
  let dni = document.getElementById('dni').value
  let email = document.getElementById('email').value

  user = new Client(dni, name, lastName, email)
  
  localStorage.setItem("user", JSON.stringify(user))

  document.getElementById("signUpForm").submit()
}

let signIn = document.getElementById('signInBtn')
let next = document.getElementById('sInNext')
let modalOverlay = document.querySelector('.overlay')

signIn.addEventListener('click', () => {
  showModal('.overlay')
})
next.addEventListener('click', signUp)
modalOverlay.addEventListener('click', hideModal)