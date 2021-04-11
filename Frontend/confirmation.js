//******************************************* Déclaration de variable ***********************************

//Déclaration de la variable qui contient les éléments du localStorage
let confirmationLocalStorage = JSON.parse(localStorage.getItem('confirmation'));

//récupération de l'élément qui contiendra le numéro de commande
let numCommande = document.getElementById('numCommande')
numCommande.innerHTML= confirmationLocalStorage[0].orderId //insération du numéro de commande dans l"élément récupéré

const table = document.getElementById("cart-tablebody") //récupétation de l'élément qui contiendra nos articles
 
//******************************************* insération des éléments récupérés dans le html ***********************************

confirmationLocalStorage[0].products.forEach(element => {  //Pour chaque éléments
    let ligne  = document.createElement('tr') //Création d'une balise 'tr'

        ligne.innerHTML = //ces balises contiendront : 
        `
        <td class="productName">${element.name}</td>
        `
        table.appendChild(ligne) // ajout de nos balises 'tr' à notre élément 'table'

});

// lorsque l'utilisateur sort de la page de confirmation
// vide le localStorage
window.addEventListener('unload', ()=>{
    localStorage.clear()
})