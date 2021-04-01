//Déclaration de la variable qui contient les éléments du localStorage
let productLocalStorage = JSON.parse(localStorage.getItem('produit'));

//const produitPanier = document.getElementById('produit-panier')
const panierVide = document.getElementById('panier-vide')

// si mon local Storage est vide 
if(productLocalStorage === null){
panierVide.innerHTML= '<p class="text-center">Le panier est vide !</p>'
//si non
}else{

    const table = document.getElementById("cart-tablebody") //récupétation de l'élément qui contiendra nos article

    productLocalStorage.forEach(element => { // pour chaque element de mon local Storage
        let ligne  = document.createElement('tr') //Creation d'une balise 'tr'

        ligne.innerHTML = //ces balises contiendront : 
        `
        <td>${element.name}</td><td>${element.color}</td><td><input type="number" id="quantity" min="1" value="${element.quantity}"></td><td id="prix">${element.price}</td>
        `
        table.appendChild(ligne) // ajout de nos balise 'tr' à notre élément 'table'

});
}
