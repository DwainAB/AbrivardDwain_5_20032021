import TeddyService from './api.js'
//********************************* Déclaration de variables *********************************

let productLocalStorage = JSON.parse(localStorage.getItem('produit')); //Déclaration de la variable qui contient les éléments du localStorage
const panierVide = document.getElementById('panier-vide') //Récupération de la balise qui contiendra un message lorsque le panier sera vide
const prixCalculer = [] // Déclaration du tableau qui contiendra les prix de tous les articles du panier
const products = [] // Déclaration d'un tableau qui contiendra l'id de tous les articles
let form = document.getElementById('confirmation') //récupération de la balise "form"

//********************************* Liste de fonctin ***********************************************

function deleteProductEventHandler(productName) {
    productLocalStorage.forEach((item, index) => {
        if (item.name == productName) {
            productLocalStorage.splice(index, 1) 
            location.reload() 
            localStorage.setItem("produit", JSON.stringify(productLocalStorage)) 
        }
    })
}

function afficheProduit() {
    
    const table = document.getElementById("cart-tablebody") 
    productLocalStorage.forEach(element => { 
        
        let ligne = document.createElement('tr') 
        ligne.innerHTML = 
            `
        <td class="productName">${element.name}</td>
        <td>${element.colors}</td>
        <td>${element.quantity}</td>
        <td class="prix">${element.price * element.quantity}</td>  
        <button id="sup" onclick=" deleteProductEventHandler('${element.name}')">Supprimer</button>
        `
        table.appendChild(ligne) 
        prixCalculer.push(element.price * element.quantity) 
        products.push(element.id) 
    });
}

function affichePrixTotal() {
    // Déclaration d'une variable qui contiendra le calcul de tous les nombres du tableau "prixCalculer"
    const prixTotal = prixCalculer.reduce((x, y) => x + y)
    let prixFinal = document.getElementById('prixFinal') 
    prixFinal.innerHTML = prixTotal 

    // Création de la variable qui stockera les keys et les values
    let prixLocalStorage = JSON.parse(localStorage.getItem('prixTotal'));
    prixLocalStorage = [] 
    prixLocalStorage.push(prixTotal) 

    // Transformation en format JSON et envois dans la key "prixTotal" du local storage
    localStorage.setItem("prixTotal", JSON.stringify(prixLocalStorage))
}


//********************************* Tableau de produit séléctionné *********************************

if (productLocalStorage === null) {
    panierVide.innerHTML = '<p class="text-center">Le panier est vide !</p>'
} else {
    afficheProduit()
}

//********************************* Calcul du prix total ***********************************************

if (productLocalStorage === null) { 
    //fais rien 
} else {
    affichePrixTotal()
}

//********************************* Formulaire 'informations personnelles' **************************************//

form.addEventListener('submit', function (e) { 
    e.preventDefault()  
    
    let erreur = '' 
    let lastName = document.getElementById('lastName')
    let firstName = document.getElementById('firstName')
    let address = document.getElementById('address')
    let city = document.getElementById('city')
    let email = document.getElementById('email')
    let email2 = document.getElementById('email2')

    if (!lastName.value) {
        erreur = "veuillez renseignez votre nom"
    }
    if (!firstName.value) {
        erreur = "veuillez renseignez votre prénom"
    }
    if (!address.value) {
        erreur = "veuillez renseignez votre adresse"
    }
    if (!city.value) {
        erreur = "veuillez renseignez votre ville"
    }
    if (!email.value) {
        erreur = "veuillez renseignez un e-mail"
    }
    if (!email2.value) {
        erreur = "veuillez confirmer votre e-mail"
    }
    if (email.value != email2.value) {
        erreur = "veuillez renseignez deux adresse e-mail identique"
    }
    if (erreur) { 
        document.getElementById('erreur').innerHTML = erreur
        return false

    } else {
        alert('formulaire envoyé') 

        // ajoute les valeurs des champs dans un objet
        let contact = {
            firstName: lastName.value,
            lastName: firstName.value,
            address: address.value,
            city: city.value,
            email: email.value
        }
//************************************** Envois des éléments au serveur ********************************************* //

        let teddyService = new TeddyService()
        const result = teddyService.updateTeddies(contact, products)

        result.then(data => {
            // Création de la variable qui stockera les keys et les values
            let confirmationLocalStorage = JSON.parse(localStorage.getItem('confirmation'));
            confirmationLocalStorage = [] // Création de la variable en tableau
            confirmationLocalStorage.push(data)  // Envois notre réponse dans le tableau
            localStorage.setItem("confirmation", JSON.stringify(confirmationLocalStorage)) //Transformation de notre réponse en format json et envois dans la key "confirmation"
            setTimeout(window.location.href = "confirmation.html", 2000)  // Retarde le changement de page de 2s
        })
    }
})

