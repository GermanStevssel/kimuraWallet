// Función para mostrar el nombre del usuario en el html
function showUser(user) {
  let userHTML = document.getElementById("user")
  userHTML.innerHTML = `${user.nameDisplayed()} Wallet`;
}