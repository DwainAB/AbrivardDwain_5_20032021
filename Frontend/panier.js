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
        <td>${element.name}</td><td>${element.color}</td><td><input type="number" id="quantity" min="1" value="${element.quantity}"></td><td class="prix">${element.price}</td><button class="sup">Supprimer</button>
        `
        table.appendChild(ligne) // ajout de nos balise 'tr' à notre élément 'table'


});
}

// formulaire avant passage de commande

let form = document.getElementById('confirmation')

form.addEventListener('submit', function(e){
    e.preventDefault()
    let erreur = ''
    let lastName = document.getElementById('lastName')
    let firstName = document.getElementById('firstName')
    let email = document.getElementById('email')
    let email2 = document.getElementById('email2')
    let mdp = document.getElementById('mdp')
   
    
   if (!lastName.value){
        erreur = "veuillez renseignez votre nom"
    }
    if (!firstName.value){
    erreur = "veuillez renseignez votre prénom"
    }
    if (!email.value){
        erreur = "veuillez renseignez un e-mail"
    }
    if (!email2.value){
        erreur = "veuillez confirmer votre e-mail"
    }
    if(email.value!=email2.value){
        erreur = "veuillez renseignez deux adresse e-mail identique"
    }
    if (!mdp.value){
        erreur = "veuillez renseignez un mot de passe"
    }
    
    if (erreur){
       document.getElementById('erreur').innerHTML = erreur
        return false
    }else {
       
        alert('formulaire envoyé')
    }

})