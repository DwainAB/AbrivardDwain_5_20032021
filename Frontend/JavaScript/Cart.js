class Cart {
    constructor(){
        this.items = JSON.parse(localStorage.getItem('Products'))
    }
    addItem(newItem){
        
    }

    removeItem(item){

    }

    calculateTotal(){
        //calculer le prix de tous les items
    }

    saveToStorage(){
        localStorage.setItem('Products', JSON.stringify(this.items))
    }
}