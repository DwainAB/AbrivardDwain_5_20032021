//********************************* Déclaration de variables *********************************

//Déclaration de la variable qui contient les éléments du localStorage
let productLocalStorage = JSON.parse(localStorage.getItem('produit'));

//Récupération de la balise qui contiendra un message lorsque le panier sera vide
const panierVide = document.getElementById('panier-vide')

// Déclaration du tableau qui contiendra les prix de tous les articles du panier
const prixCalculer = []

// Déclaration d'un tableau qui contiendra l'id de tous les articles
const products =[]

//********************************* Tableau de produit séléctionné *********************************

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
        
        products.push(element.id) // Envois les Id dans le tableau "products"
});
}

//********************************* Calcul du prix total ***********************************************

if(productLocalStorage === null){ //si le productLocalStorage est vide
//fais rien 
}else{

    // Déclaration d'une variable qui contiendra le calcul de tous les nombres du tableau "prixCalculer"
    const prixTotal = prixCalculer.reduce((x , y) => x + y)

    let prixFinal = document.getElementById('prixFinal') // Récupération de la balise qui affichera le prix
    
    prixFinal.innerHTML= prixTotal  // Affiche le prix dans la balise récupéré
}


//********************************* Supprimer un article du panier **********************************************

// création de la fonction qui permettra de supprimer un article

function deleteProductEventHandler(productName){
    productLocalStorage.forEach((item, index) => {
        if(item.name == productName){
            productLocalStorage.splice(index, 1) // Supprime le produit séléctionné
            location.reload() // Relance la page
            localStorage.setItem("produit", JSON.stringify(productLocalStorage)) // Renvois le résultat dans le localStorage
        }
    })
}

//********************************* Formulaire 'informations personnelles' **************************************//

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

        // ajoute les valeurs des champs dans un objet
        let contact = {
            firstName: lastName.value,
            lastName: firstName.value,
            address : address.value,
            city : city.value,
            email : email.value 
        }
//************************************** Envois des éléments au serveur ********************************************* //

        fetch('http://localhost:3000/api/teddies/order',{  // Connexion à l'API
            method:"POST",      // Utilisation de la méthode POST pour transmettre des données
            headers : { //Indique que nous envoyons du format JSON
                "Content-type" : "application/json"
            },
            body : JSON.stringify({ // Transformation de notre objet "contact" et de notre tableau "products" en format JSON
                contact : contact, // Envois de notre objet contact
                products : products  // Envois de notre tableau "products"
            })
        })
        .then( res =>{  
            if(res.ok){
                res.json().then(data =>{

                    // Création de la variable qui stockera les keys et les values
                    let confirmationLocalStorage = JSON.parse(localStorage.getItem('confirmation')); 

                    confirmationLocalStorage= [] // Création de la variable en tableau
                    confirmationLocalStorage.push(data)  // Envois notre réponse dans le tableau
                    localStorage.setItem("confirmation", JSON.stringify(confirmationLocalStorage)) //Transformation de notre réponse en format json et envois dans la key "confirmation"
                    setTimeout(window.location.href="confirmation.html",2000)  // Retarde le changement de page de 2s
                })
            }
        })
    }
})

