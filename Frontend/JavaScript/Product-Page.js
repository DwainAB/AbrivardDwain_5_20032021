//******************************* Récupération de notre fetch ********************************
import TeddyService from './api.js'
import Product from './Product.js'
import Cart from './Cart.js'
//********************************* Déclaration de variables *********************************

const queryString_url_id = window.location.search; // récupération de la chaîne de requête dans l'url
const idProduct = queryString_url_id.slice(1) // extraction de l'id seulement 
const sendButton = document.getElementById('btn-envoyer') //Récupération du boutton d'envois
let cart = new Cart()
let product = new Product()

//********************************* Récupération de notre produit avec Fetch *********************************
//********************************* Et insération dans le code html ******************************************


function addBasket(data) {
  sendButton.addEventListener('click', (e) => {
    e.preventDefault()

    const getQuantity = document.getElementById('quantity').value
    const getName = document.getElementById('nom');

    let productLocalStorage = JSON.parse(localStorage.getItem('Products'));
    let uniqueId = 0
    let color = document.getElementById("colors").options[document.getElementById('colors').selectedIndex].text
    const name = getName.innerText || getName.textContent;
    let quantity = Number(getQuantity)

    if (productLocalStorage !== null) {
      uniqueId = productLocalStorage.length
    }

    let infoProduct = new Product(data._id, data.name, product.getFormattedPrice(data.price), data.imageUrl, data.description, data.colors, data.quantity = quantity, data.uniqueId = uniqueId, data.selectedColor = color)

    cart.addItem(infoProduct, name, color, quantity)

  })
}

let teddyApi = new TeddyService()
const result = teddyApi.getTeddy(idProduct)

result.then(data => {

  let picture = document.getElementById('image')
  let name = document.getElementById('nom')
  let price = document.getElementById('prix')
  let description = document.getElementById('description')

  picture.src = data.imageUrl
  name.innerHTML = data.name
  price.innerHTML = product.getFormattedPrice(data.price)
  description.innerHTML = data.description

  // Boucle qui nous permet de récupérer les différentes couleurs pour notre select
  for (let i = 0; i < data.colors.length; i++) {
    let sel = document.getElementById('colors');
    let opt = document.createElement('option');
    opt.value = i;
    opt.text = data.colors[i];
    sel.add(opt, null);
  }
  addBasket(data)
})