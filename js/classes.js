// Clase para crear instancias de clientes
class Client {
	constructor(dni, name, lastName, email, balance) {
		this.dni = dni;
		this.name = name;
		this.lastName = lastName;
    this.email = email;
		this.balance = balance;
    this.wallet = [];
	}
  //Método para actualizar la disponibilidad de dinero del cliente
	updateBalance(buy) { 
		this.balance -= buy;
	}
  //Método para actualizar las tenencias del cliente en su billetera
  updateWallet(operation) {

    let ticker = operation.ticker
    let index = -1

    this.wallet.forEach(element => { 
      if(element.ticker == ticker) {
        index = this.wallet.indexOf(element)
      }
    })

    if( index !== -1) {
      let qty = operation.qty
      let value = operation.value

      this.wallet[index].qty += qty
      this.wallet[index].value += value

    } else {
      this.wallet.push(operation);
    }  
  }

  nameDisplayed() {
    return `${this.name} ${this.lastName[0]}.`
  }
}
// Clase para crear instancias de instrumentos
class Instrument {
	constructor(id, type, name, ticker, price) {
    this.id = id;
		this.type = type;
    this.name = name;
		this.ticker = ticker;
		this.price = price;
	}
}
// Clase para crear instancias de operaciones
class Operations {
  constructor(date, instrument, qty, price, value) {
    this.date = date;
    this.ticker = instrument.ticker;
    this.name = instrument.name;
    this.qty = qty;
    this.price = price;
    this.value = value;
  }
}