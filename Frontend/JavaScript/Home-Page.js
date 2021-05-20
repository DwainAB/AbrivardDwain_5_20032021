//********************************* Déclaration de variables *********************************
import TeddyService from "./api.js"
import Product from "./Product.js"


// récupération de la div qui contiendra nos produits
let container = document.getElementById('products-container')

//********************************* Récupération de nos produits avec fetch *********************************

let getTeddyApi = new TeddyService()
const result = getTeddyApi.getTeddies()

result.then(teddies =>{
    teddies.forEach(teddie => {
       
        
        const card = document.createElement('div') // création d'une div qui contiendra notre code html
        card.classList.add('col-lg-4')
        card.classList.add('col-sm-6')
        card.innerHTML =  // insération du code html dans nos div
            `
                <div class="card mt-4 mt-lg-0">
                    <img class='produit' src='${teddie.imageUrl}' alt='ours en peluche'/>
                    <div class='card-body'>
                        <h4 class='card-title'>${teddie.name}</h4>
                        <p>${teddie.price / 100} € </p>
                        <a href="Product-Page.html?${teddie._id}" class="stretched-link"></a> 
                    </div>
                </div>
    `
        container.appendChild(card) //ajout de nos div en tant qu'enfant à la div principal
    });
})


