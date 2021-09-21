let logUser = JSON.parse(localStorage.getItem('user'))
let dni = logUser.dni
let name = logUser.name
let lastName = logUser.lastName
let email = logUser.email

user = new Client(dni, name, lastName, email) 

$(document).ready(showUser(user))
// Darle animación a la sidebar al clickear en el botón
$('.navToggleBtn').click(animateSideBar);
// Mostrar modal de depósito
$('#deposit').click(() => {
  showModal('.dOverlay')
})
// Mostrar modal de depósito
$('#withdraw').click(() => {
  showModal('.wOverlay')
})
// Al clickear llama la función deposit, para depositar dinero en la cuenta
$('#dConfirm').click(deposit)
// Ocultar modal para depositar
$('.dOverlay').on('click', hideModal)
// Al clickear llama la función withdraw, para retirar dinero en la cuenta
$('#wConfirm').click(withdraw)
// Ocultar modal para retirar
$('.wOverlay').on('click', hideModal)
/* Al clickear el boton de comprar, toma los instrumentos del json y 
* los da cómo opción, además de mostrar el modal de compra
*/
$('#buyBtn').on('click', () => {
  $('#bInstrument').empty()  
  let URLJSON = 'https://germanstevssel.github.io/apiInstruments/db.json'
  $('#bInstrument').append(`<!-- Opciones de la lista -->
  <option value="0"></option> <!-- Opción por defecto -->`)
  
  $.get(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;

      for (const dato of misDatos) {
        $('#bInstrument').append(
          `<option value="${dato.id}">${dato.name}</option>`
        )
      }  
    }
  });
  // Mostrar modal de compra
  showModal('.bOverlay')
});
// Cargar el precio del producto seleccionado
$('#bInstrument').change(setPrice)
/* Al clickear el boton de vender, toma los instrumentos de la billetera
* del usuario y los da cómo opción, además de mostrar el modal de venta
*/
$('#sellBtn').on('click', () => {
  $('#sInstrument').empty()
  $('#sInstrument').append(`<!-- Opciones de la lista -->
  <option value="0"></option> <!-- Opción por defecto -->`)

  user.wallet.forEach(element => {
    $('#sInstrument').append(
      `<option value="${element.id}">${element.name}</option>`
    )
  });
  // Mostrar modal de venta
  showModal('.sOverlay')
});
// Cargar el instrumento para compra
$('#bInstrument').change(findInstrument)
// Cargar el instrumento para venta
$('#sInstrument').change(findInstrument)
// Al clickear llama la función buy, para comprar los instrumentos
$('#bConfirm').on('click', buy)
// Al clickear llama la función sell, para vender los instrumentos
$('#sConfirm').on('click', sell)
// Ocultar modal para comprar
$('.bOverlay').on('click', hideModal)
// Ocultar modal para vender
$('.sOverlay').on('click', hideModal)
// Mostrar historial completo
$('#todo').click(() => {
  filterAbstract('todo')
})
// Filtrar historial por criptomoneda
$('#cripto').click(() => {
  filterAbstract('Criptomoneda')
})
// Filtrar historial por acciones
$('#acciones').click(() => {
  filterAbstract('Acción')
})
// Ordenar historial por fecha
$('#fecha').click(() => {
  arrangedRecord('fecha')
})
// Ordenar historial de mayor a menor valor
$('#mayor').click(() => {
  arrangedRecord('mayor')
})
// Ordenar historial de menor a mayor valor
$('#menor').click(() => {
  arrangedRecord('menor')
})
