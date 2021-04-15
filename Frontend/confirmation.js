//******************************************* Déclaration de variable ***********************************

//Déclaration des variable qui contient les éléments du localStorage
let productLocalStorage = JSON.parse(localStorage.getItem('produit'));
console.log(productLocalStorage)

let prixLocalStorage = JSON.parse(localStorage.getItem('prixTotal'));
console.log(prixLocalStorage);

let confirmationLocalStorage = JSON.parse(localStorage.getItem('confirmation'));

//récupération de l'élément qui contiendra le prix
let prixTotal = document.getElementById('prixTotal')
prixTotal.innerHTML= prixLocalStorage //Ajout du prix

//récupération de l'élément qui contiendra le numéro de commande
let numCommande = document.getElementById('numCommande')
numCommande.innerHTML= confirmationLocalStorage[0].orderId //insération du numéro de commande dans l"élément récupéré

const table = document.getElementById("cart-tablebody") //récupétation de l'élément qui contiendra nos articles
 
//******************************************* insération des éléments récupérés dans le html ***********************************

productLocalStorage.forEach(element => {  //Pour chaque éléments
    let ligne  = document.createElement('tr') //Création d'une balise 'tr'

        ligne.innerHTML = //ces balises contiendront : 
        `
        <td class="productName">${element.name}</td>
        <td class="productName">x${element.quantity}</td>
        `
        table.appendChild(ligne) // ajout de nos balises 'tr' à notre élément 'table'

});


// lorsque l'utilisateur sort de la page de confirmation
// vide le localStorage
window.addEventListener('unload', ()=>{
    localStorage.clear()
})