import TeddyService from './api.js'
import Cart from './Cart.js'
//********************************* Déclaration de variables *********************************

let productLocalStorage = JSON.parse(localStorage.getItem('Products')); //Déclaration de la variable qui contient les éléments du localStorage
const emptyBasket = document.getElementById('panier-vide') //Récupération de la balise qui contiendra un message lorsque le panier sera vide
const pricesCalculate = [] // Déclaration du tableau qui contiendra les prix de tous les articles du panier
const products = [] // Déclaration d'un tableau qui contiendra l'id de tous les articles
let form = document.getElementById('confirmation') //récupération de la balise "form"
let cart = new Cart()
//********************************* Liste de fonctin ***********************************************

function showProducts() {

    const table = document.getElementById("cart-tablebody")
    productLocalStorage.forEach(element => {

        let tableRow = document.createElement('tr')
        tableRow.innerHTML =
            `
        <td class="productName">${element.name}</td>
        <td>${element.colors}</td>
        <td>${element.quantity}</td>
        <td class="prix">${element.price * element.quantity}</td>  
        <button class="removeItem">Supprimer</button>
        `
        table.appendChild(tableRow)
        pricesCalculate.push(element.price * element.quantity)
        products.push(element._id)

    });

    let item = document.querySelectorAll('.removeItem')

    cart.removeItem(item, productLocalStorage)
}


//********************************* Tableau de produit séléctionné *********************************

if (productLocalStorage === null || productLocalStorage == 0) {
    localStorage.clear()
    emptyBasket.innerHTML = '<p class="text-center">Le panier est vide !</p>'

} else {
    showProducts()
    cart.calculateTotal(pricesCalculate)
}

//********************************* Formulaire 'informations personnelles' **************************************//

form.addEventListener('submit', function (e) {
    e.preventDefault()

    let error = ''
    let lastName = document.getElementById('lastName')
    let firstName = document.getElementById('firstName')
    let address = document.getElementById('address')
    let city = document.getElementById('city')
    let email = document.getElementById('email')
    let email2 = document.getElementById('email2')

    if (!lastName.value) {
        error = "veuillez renseignez votre nom"
    }
    if (!firstName.value) {
        error = "veuillez renseignez votre prénom"
    }
    if (!address.value) {
        error = "veuillez renseignez votre adresse"
    }
    if (!city.value) {
        error = "veuillez renseignez votre ville"
    }
    if (!email.value) {
        error = "veuillez renseignez un e-mail"
    }
    if (!email2.value) {
        error = "veuillez confirmer votre e-mail"
    }
    if (email.value != email2.value) {
        error = "veuillez renseignez deux adresse e-mail identique"
    }
    if (error) {
        document.getElementById('erreur').innerHTML = error
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

