//******************************* Récupération de notre fetch ********************************
import TeddyService from './api.js'
import Product from './Product.js'
import Cart from './Cart.js'
//********************************* Déclaration de variables *********************************

const queryString_url_id = window.location.search; // récupération de la chaîne de requête dans l'url
const leId = queryString_url_id.slice(1) // extraction de l'id seulement 
const sendButton = document.getElementById('btn-envoyer') //Récupération du boutton d'envois
let cart = new Cart()
//******************** Fonction qui récupère les informations du produit *******************/
//******************************** Et les envois dans le localStorage **********************/

function addBasket() {
  sendButton.addEventListener('click', (e) => {
    e.preventDefault()

    const getQuantity = document.getElementById('quantity').value
    const colors = document.getElementById("colors").options[document.getElementById('colors').selectedIndex].text;
    const getName = document.getElementById('nom');
    const getPrice = document.getElementById('prix')

    let productLocalStorage = JSON.parse(localStorage.getItem('Products'));
    let uniqueId = 0
    let quantity = Number(getQuantity)
    const name = getName.innerText || getName.textContent;
    const price = getPrice.innerText || getPrice.textContent;

    if (productLocalStorage !== null) {
      uniqueId = productLocalStorage.length
    }

    let getInfoProduct = new Product(name, price, leId, colors, quantity, uniqueId)

    cart.addItem(productLocalStorage, getInfoProduct, name, colors, quantity)

  })
}

//********************************* Récupération de notre produit avec Fetch *********************************
//********************************* Et insération dans le code html ******************************************

let getTeddyApi = new TeddyService()
const result = getTeddyApi.getTeddy(leId)

result.then(data => {

  let picture = document.getElementById('image')
  let name = document.getElementById('nom')
  let price = document.getElementById('prix')
  let description = document.getElementById('description')

  picture.src = data.imageUrl
  name.innerHTML = data.name
  price.innerHTML = data.price / 100
  description.innerHTML = data.description

  // Boucle qui nous permet de récupérer les différentes couleurs pour notre select
  for (let i = 0; i < data.colors.length; i++) {
    let sel = document.getElementById('colors');
    let opt = document.createElement('option');
    opt.value = i;
    opt.text = data.colors[i];
    sel.add(opt, null);
  }
  addBasket()
})