export default class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('Products'))
    }

    addItem(productLocalStorage, getInfoProduct, name, colors, quantity) {

        const addProductLocalStorage = () => {
            productLocalStorage.push(getInfoProduct)
            localStorage.setItem("Products", JSON.stringify(productLocalStorage)) // Transformation en format JSON et envois dans la key "Products" du local storage
        }

        if (productLocalStorage == null) {
            productLocalStorage = [];
        }

        let newArticle = true

        productLocalStorage.forEach(element => {
            if (element.name == name & element.colors == colors) {
                newArticle = false
                let getElementQuantity = Number(element.quantity)
                element.quantity = getElementQuantity += quantity
                localStorage.setItem("Products", JSON.stringify(productLocalStorage)) // Transformation en format JSON et envois dans la key "Products" du local storage

            }
        });

        if (newArticle) {
            addProductLocalStorage()
        }
    }

    removeItem(item, productLocalStorage) {

        for (let i = 0; i < item.length; i++) {
            item[i].addEventListener('click', () => {
                let uniqueIdItem = productLocalStorage[i].uniqueId
                productLocalStorage = productLocalStorage.filter(element => element.uniqueId !== uniqueIdItem);
                localStorage.setItem('Products', JSON.stringify(productLocalStorage))
                location.reload()
            })
        }
    }

    calculateTotal(pricesCalculate) {

        const totalPrice = pricesCalculate.reduce((x, y) => x + y)
        let prixFinal = document.getElementById('prixFinal')
        prixFinal.innerHTML = totalPrice

        // Création de la variable qui stockera les keys et les values
        let prixLocalStorage = JSON.parse(localStorage.getItem('basketPrice'));
        prixLocalStorage = []
        prixLocalStorage.push(totalPrice)

        // Transformation en format JSON et envois dans la key "basketPrice" du local storage
        localStorage.setItem("basketPrice", JSON.stringify(prixLocalStorage))

    }

    saveToStorage() {
        localStorage.setItem('Products', JSON.stringify(this.items))
    }
}