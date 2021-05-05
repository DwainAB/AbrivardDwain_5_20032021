//********************************** Déclaration de variable ***********************************

//Déclaration des variable qui contient les éléments du localStorage
let producstLocalStorage = JSON.parse(localStorage.getItem('Products'));
let priceLocalStorage = JSON.parse(localStorage.getItem('basketPrice'));
let confirmationLocalStorage = JSON.parse(localStorage.getItem('confirmation'));
let totalPrice = document.getElementById('prixTotal')
let numCommande = document.getElementById('numCommande')
const table = document.getElementById("cart-tablebody") 
 
//************************** insération des éléments récupérés dans le html ***********************************


function orderInformation() {
    totalPrice.innerHTML= priceLocalStorage 
    numCommande.innerHTML= confirmationLocalStorage[0].orderId 

    producstLocalStorage.forEach(element => {  
        let tableRow  = document.createElement('tr') 
            tableRow.innerHTML = 
            `
            <td class="productName">${element.name}</td>
            <td class="productName">x${element.quantity}</td>
            `
            table.appendChild(tableRow) 
    });
}
orderInformation()
// lorsque l'utilisateur sort de la page de confirmation
// vide le localStorage
window.addEventListener('unload', ()=>{
    localStorage.clear()
})