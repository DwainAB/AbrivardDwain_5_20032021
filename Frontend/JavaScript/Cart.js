class Cart {
    constructor(){
        this.items = JSON.parse(localStorage.getItem('produit'))
    }
    addItem(newItem){
        
    }

    removeItem(item){

    }

    calculateTotal(){
        //calculer le prix de tous les items
    }

    saveToStorage(){
        localStorage.setItem('produit', JSON.stringify(this.items))
    }
}