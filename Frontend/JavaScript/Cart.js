export default class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('Products')) || []
    }

    addItem(infoProduct, name, color, quantity) {

        let newArticle = true

        this.items.forEach(element => {
         
            if (element.name == name & element.selectedColor == color) {
                newArticle = false
                let getElementQuantity = Number(element.quantity)
                element.quantity = getElementQuantity += quantity
            }
        });

        if (newArticle) {
            this.items.push(infoProduct)

        }
        this.saveToStorage()
    }

    removeItem(item) {

        for (let i = 0; i < item.length; i++) {
            item[i].addEventListener('click', () => {
                let uniqueIdItem = this.items[i].uniqueId
                this.items = this.items.filter(element => element.uniqueId !== uniqueIdItem);
                this.saveToStorage()
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