// ---------------------------Déclaration de variables -----------------------------------------

//Déclaration de la variable qui contient les éléments du localStorage
let productLocalStorage = JSON.parse(localStorage.getItem('produit'));

//Récupération de la balise qui contiendra un message lorsque le panier sera vide
const panierVide = document.getElementById('panier-vide')

// Déclaration du tableau qui contiendra les prix de tous les articles du panier
const prixCalculer = []

//--------------------------Tableau de produit séléctionné-------------------------------

// si mon local Storage est vide 
if(productLocalStorage === null){
panierVide.innerHTML= '<p class="text-center">Le panier est vide !</p>'
//sinon
}else{

    const table = document.getElementById("cart-tablebody") //récupétation de l'élément qui contiendra nos articles

    productLocalStorage.forEach(element => { // pour chaque éléments de mon local Storage
        let ligne  = document.createElement('tr') //Création d'une balise 'tr'

        ligne.innerHTML = //ces balises contiendront : 
        `
        <td class="productName">${element.name}</td>
        <td>${element.color}</td>
        <td>${element.quantity}</td>
        <td class="prix">${element.price * element.quantity}</td>  
        <button id="sup" onclick="deleteProductEventHandler('${element.name}')">Supprimer</button>
        `
        table.appendChild(ligne) // ajout de nos balises 'tr' à notre élément 'table'

        prixCalculer.push(element.price * element.quantity) //Envoie les prix de nos articles au tableau "prixCalculer"
    
});
}

//-----------------------------Calcul du prix total------------------------------------------------

 // Déclaration d'une variable qui contiendra le calcul de tous les nombres du tableau "prixCalculer"
const prixTotal = prixCalculer.reduce((x , y) => x + y)

let prixFinal = document.getElementById('prixFinal') //récupération de la balise qui affichera le prix

prixFinal.innerHTML= prixTotal 

//------------------------------Supprimer un article du panier--------------------------------------

// création de la fonction qui permettra de supprimer un article

function deleteProductEventHandler(productName){
    productLocalStorage.forEach((item, index) => {
        if(item.name == productName){
            productLocalStorage.splice(index, 1)
            location.reload()
            localStorage.setItem("produit", JSON.stringify(productLocalStorage))
        }
    })
}

//--------------------------------Formulaire 'informations personnelles'-----------------------------

let form = document.getElementById('confirmation') //récupération de la balise "form"

form.addEventListener('submit', function(e){ //lors du clic sur le bouton du formulaire
    e.preventDefault()  //Ne recharge pas la page
    // récupère les éléments ci-dessous
    let erreur = '' // cette variable nous permettra d'écrire notre message d'erreur
    let lastName = document.getElementById('lastName')
    let firstName = document.getElementById('firstName')
    let address = document.getElementById('address')
    let city = document.getElementById('city')
    let email = document.getElementById('email')
    let email2 = document.getElementById('email2')
    let infoCommande = []
    
   
    // lorsqu'un élément n'est pas rempli, affiche un message d'erreur dans la variable "erreur"
   if (!lastName.value){
        erreur = "veuillez renseignez votre nom"
    }
    if (!firstName.value){
    erreur = "veuillez renseignez votre prénom"
    }
    if (!address.value){
        erreur = "veuillez renseignez votre adresse"
    }
    if(!city.value){
        erreur = "veuillez renseignez votre ville"
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
    if (erreur){ //Donc si "erreur", récupère la balise qui affichera le message
       document.getElementById('erreur').innerHTML = erreur
        return false 
    }else {
        alert('formulaire envoyé') //Si tous les champs sont remplis, une alerte s'affichera

        let coordonnée = {
            nom : lastName.value,
            prenom : firstName.value,
            adresse : address.value,
            ville : city.value,
            email : email.value 
        }
        infoCommande.push(coordonnée)
        infoCommande.push(productLocalStorage)
        console.log(infoCommande);

    }


})
