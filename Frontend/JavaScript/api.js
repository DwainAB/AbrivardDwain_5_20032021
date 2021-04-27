//******************************* Class des API ***********************************

export default class TeddyService {

//************************************ API de panier.js *****************************

    async updateTeddies(contact, products) {
        console.log("updateTeddies");
       let reponse = await fetch('http://localhost:3000/api/teddies/order',{  // Connexion à l'API
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
                return res.json()   
            }
        })
        return reponse
    }

//********************************* API de produit.js ***********************/

    async getTeddy(id) {
        console.log("getTeddy");
       let reponse2 = await fetch(`http://localhost:3000/api/teddies/${id}`)  // Connexion à l'API
        .then( res =>{  
            if(res.ok){
                return res.json()   
            }
        })
        return reponse2
    }


//********************************* API de index.js ***********************/

async getTeddies() {
    console.log("getTeddies");
   let reponse3 = await fetch("http://localhost:3000/api/teddies")  // Connexion à l'API
    .then( res =>{  
        if(res.ok){
            return res.json()   
        }
    })
    return reponse3
}

}