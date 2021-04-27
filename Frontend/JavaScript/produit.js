//******************************* Récupération de notre fetch ********************************
//import { getTeddy } from "./api.js"
import Product from "./class.js"
import TeddyService from './api.js'
//********************************* Déclaration de variables *********************************

const queryString_url_id = window.location.search; // récupération de la chaîne de requête dans l'url
const leId = queryString_url_id.slice(1) // extraction de l'id seulement 
const container = document.getElementById('container-product') // récupération de l'élément qui contiendra notre produit
const btnEnvoyer = document.getElementById('btn-envoyer') //Récupération du boutton d'envois

//******************** Fonction qui récupère les informations du produit *******************/
//******************************** Et les envois dans le localStorage **********************/

function ajoutPanier (){
  btnEnvoyer.addEventListener('click', (e) => {
    e.preventDefault() 
    const quantity = document.getElementById('quantity').value 
    const colors = document.getElementById("colors").options[document.getElementById('colors').selectedIndex].text;  
    const elt = document.getElementById('nom');
    const nom = elt.innerText || elt.textContent;

    const prixArticle = document.getElementById('prix');
    const prix = prixArticle.innerText || prixArticle.textContent;

    let infoProduct = {  // création d'un objet qui contiendra les informations du produit séléctionner par l'utilisateur
      colors: colors,
      quantity: quantity,
      name: nom,
      price: prix,
      id: leId
    }

    // création de la variable qui stockera les keys et les values
    let productLocalStorage = JSON.parse(localStorage.getItem('produit'));

    const ajoutProduitLocalStorage = () => {
      productLocalStorage.push(infoProduct) 
      localStorage.setItem("produit", JSON.stringify(productLocalStorage)) // Transformation en format JSON et envois dans la key "produit" du local storage
    }
  
    if (productLocalStorage == null) {
      productLocalStorage = [];
    }
    ajoutProduitLocalStorage()
  })
}

//********************************* Récupération de notre produit avec Fetch *********************************
//********************************* Et insération dans le code html ******************************************

let getTeddyApi = new TeddyService()
const result = getTeddyApi.getTeddy(leId)

result.then(data => {
  let selectedItem = new Product (data.name, data.price, data.imageUrl, data._id, data.description, data.colors )

  const produit = document.createElement('div') 
  produit.innerHTML =  
    `
  <div class="card">
  <img src="${selectedItem.imageUrl}" alt="">
  <div class="body-card">
    <div class="row">
      <h4 class="title-card" id="nom">${selectedItem.name}</h4></div>
      <p class="price-card"><span id="prix">${selectedItem.price / 100}</span> €</p>

        <form>
          <label for="colors">Couleurs</label>
          <select name="couleur" id="colors"></select> </br>

          <label for="quantity">Quantité</label>
          <select id="quantity" name="q">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </form>
      <p class="card-description">${selectedItem.description}</p>
  </div>
</div>
`
  container.appendChild(produit)    

  // Boucle qui nous permet de récupérer les différentes couleurs pour notre select
  for (let i = 0; i < selectedItem.colors.length; i++) {
    let sel = document.getElementById('colors');
    let opt = document.createElement('option');
    opt.value = i;
    opt.text = selectedItem.colors[i];
    sel.add(opt, null);
  }  
  ajoutPanier()
})