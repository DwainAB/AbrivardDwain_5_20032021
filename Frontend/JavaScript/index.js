//********************************* Déclaration de variables *********************************
import TeddyService from "./api.js"
import Product from "./class.js"


// récupération de la div qui contiendra nos produits
let container = document.getElementById('products-container')

//********************************* Récupération de nos produits avec fetch *********************************

let getTeddyApi = new TeddyService()
const result = getTeddyApi.getTeddies()

result.then(data =>{
    data.forEach(element => {
        console.log(Product);
        let allItems = new Product (element.name, element.price, element.imageUrl, element._id)
        const carte = document.createElement('div') // création d'une div qui contiendra notre code html
        carte.classList.add('col-lg-4')
        carte.classList.add('col-sm-6')
        carte.innerHTML =  // insération du code html dans nos div
            `
                <div class="card mt-4 mt-lg-0">
                    <img class='produit' src='${allItems.imageUrl}' alt='ours en peluche'/>
                    <div class='card-body'>
                        <h4 class='card-title'>${allItems.name}</h4>
                        <p>${allItems.price / 100} € </p>
                        <a href="produit.html?${allItems._id}" class="stretched-link"></a> 
                    </div>
                </div>
    `
        container.appendChild(carte) //ajout de nos div en tant qu'enfant à la div principal
    });
})


