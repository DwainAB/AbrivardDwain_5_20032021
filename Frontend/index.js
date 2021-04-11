//********************************* Déclaration de variables *********************************

// récupération de la div qui contiendra nos produits
const container = document.getElementById('products-container') 

//********************************* Récupération de nos produits avec fetch *********************************

// récupération de nos produits depuis l'API + insération dans le code html
fetch ('http://localhost:3000/api/teddies')
.then(res => {
    if(res.ok){
        res.json().then(data => {
            
            class recoveredProducts{
                constructor(name, price, imageUrl, _id){
                  this.name = name
                  this.price = price
                  this.imageUrl = imageUrl
                  this._id =  _id
                }
              }

         data.forEach(element => { // Dans notre tableau data, pour chaque éléments =>

            let recoveredProduct = new recoveredProducts (element.name, element.price, element.imageUrl,element._id)   

            const carte = document.createElement('div') // création d'une div qui contiendra notre code html
            carte.classList.add('col-lg-4')
            carte.classList.add('col-sm-6')
                carte.innerHTML=  // insération du code html dans nos div
                `
                            <div class="card mt-4 mt-lg-0">
                                <img class='produit' src='${recoveredProduct.imageUrl}' alt='ours en peluche'/>
                                <div class='card-body'>
                                    <h4 class='card-title'>${recoveredProduct.name}</h4>
                                    <p>${recoveredProduct.price / 100} € </p>
                                    <a href="produit.html?${recoveredProduct._id}" class="stretched-link"></a> 
                                </div>
                            </div>
                `
            container.appendChild(carte) //ajout de nos div en tant qu'enfant à la div principal
         });
        })
    } else{
        alert('erreur 404')
    }
})

