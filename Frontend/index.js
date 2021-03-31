// récupération de la div qui contiendra nos produits
const container = document.getElementById('products-container') 

// récupération de nos produits depuis l'API + insération dans le code html
fetch ('http://localhost:3000/api/teddies')
.then(res => {
    if(res.ok){
        res.json().then(data => {
         data.forEach(element => { // Dans notre tableau data, pour chaque éléments =>
            const carte = document.createElement('div') // création d'une div qui contiendra notre code html
            carte.classList.add('col-lg-4')
            carte.classList.add('col-sm-6')
                carte.innerHTML=  // insération du code html dans nos div
                `
                            <div class="card mt-4 mt-lg-0">
                                <img class='produit' src='${element.imageUrl}' alt='ours en peluche'/>
                                <div class='card-body'>
                                    <h4 class='card-title'>${element.name}</h4>
                                    <p>${element.price / 100} € </p>
                                    <a href="produit.html?${element._id}" class="stretched-link"></a> 
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

