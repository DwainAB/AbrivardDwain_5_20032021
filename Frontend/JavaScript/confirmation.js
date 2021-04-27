//********************************** Déclaration de variable ***********************************

//Déclaration des variable qui contient les éléments du localStorage
let productLocalStorage = JSON.parse(localStorage.getItem('produit'));
console.log(productLocalStorage)

let prixLocalStorage = JSON.parse(localStorage.getItem('prixTotal'));
console.log(prixLocalStorage);

let confirmationLocalStorage = JSON.parse(localStorage.getItem('confirmation'));

let prixTotal = document.getElementById('prixTotal')
prixTotal.innerHTML= prixLocalStorage 

let numCommande = document.getElementById('numCommande')
numCommande.innerHTML= confirmationLocalStorage[0].orderId 

const table = document.getElementById("cart-tablebody") 
 
//************************** insération des éléments récupérés dans le html ***********************************

productLocalStorage.forEach(element => {  
    let ligne  = document.createElement('tr') 
        ligne.innerHTML = 
        `
        <td class="productName">${element.name}</td>
        <td class="productName">x${element.quantity}</td>
        `
        table.appendChild(ligne) 
});

// lorsque l'utilisateur sort de la page de confirmation
// vide le localStorage
window.addEventListener('unload', ()=>{
    localStorage.clear()
})