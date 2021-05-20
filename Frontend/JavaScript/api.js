//******************************* Class des API ***********************************
import Product from "./Product.js"
export default class TeddyService {
    //************************************ API de panier.js *****************************

    async updateTeddies(contact, products) {
        console.log("updateTeddies");
        return await fetch('http://localhost:3000/api/teddies/order', {  // Connexion à l'API
            method: "POST",      // Utilisation de la méthode POST pour transmettre des données
            headers: { //Indique que nous envoyons du format JSON
                "Content-type": "application/json"
            },
            body: JSON.stringify({ // Transformation de notre objet "contact" et de notre tableau "products" en format JSON
                contact: contact, // Envois de notre objet contact
                products: products  // Envois de notre tableau "products"
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
    }

    //********************************* API de produit.js ***********************/

    async getTeddy(id) {
        console.log("getTeddy");
        return await fetch(`http://localhost:3000/api/teddies/${id}`)  // Connexion à l'API
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(jsonData => {
                return new Product(jsonData._id, jsonData.name, jsonData.price, jsonData.imageUrl, jsonData.description, jsonData.colors, jsonData.quantity, jsonData.uniqueId, jsonData.selectedColor)
            }) 
    }

    //********************************* API de index.js ***********************/

    async getTeddies() {
        return await fetch("http://localhost:3000/api/teddies")  // Connexion à l'API
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(jsonDataArray => {
                let teddies = []
                jsonDataArray.forEach(jsonData => {
                    let teddie = new Product(jsonData._id, jsonData.name, jsonData.price, jsonData.imageUrl, jsonData.description, jsonData.colors, jsonData.quantity, jsonData.uniqueId, jsonData.selectedColor)
                    teddies.push(teddie)
                });
                return teddies
            })
        
    }

}
