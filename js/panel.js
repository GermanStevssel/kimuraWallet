let bBtn = $('#buyBtn')
let sBtn = $('#sellBtn')
let dOverlay = $('.dOverlay')
let bOverlay = $('.bOverlay')
let sOverlay = $('.sOverlay')
let confirmBtn = $('#bConfirm')

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

confirmBtn.on('click', buy)
//Al clickear el boton de comprar, toma los instrumentos del json y los da cómo opción
bBtn.on('click', () => {
  $('#bInstrument').empty()  
  let URLJSON = '/data/instruments.json'
  $('#bInstrument').append(`<!-- Opciones de la lista -->
  <option value="0"></option> <!-- Opción por defecto -->`)

  $.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;

      for (const dato of misDatos) {
        $('#bInstrument').append(
          `<option value="${dato.id}">${dato.name}</option>`
        )
      }  
    }
  });

  showModal('.bOverlay')
});

sBtn.on('click', () => {
  $('#sInstrument').append(`<!-- Opciones de la lista -->
  <option value="0"></option> <!-- Opción por defecto -->`)

  user.wallet.forEach(element => {
    $('#sInstrument').append(
      `<option value="${element.id}">${element.name}</option>`
    )
  });

  showModal('.sOverlay')
});

// Cargar el instrumento para compra
$('#bInstrument').change(() => {
  let URLJSON = '/data/instruments.json'
  let selection = $('#bInstrument').val()

  $.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;    
      instSelected = misDatos.find(element => element.id == selection)
    }
  });
})

dOverlay.on('click', hideModal)

bOverlay.on('click', hideModal)

sOverlay.on('click', hideModal)