 export default class Product{
    constructor(_id, name, price, imageUrl, description, colors, quantity, uniqueId, selectedColor){
      this._id =  _id
      this.name = name
      this.price = price
      this.imageUrl = imageUrl
      this.description = description
      this.colors = colors
      this.quantity = quantity
      this.uniqueId = uniqueId
      this.selectedColor = selectedColor
    }

    getFormattedPrice(number){
     return number / 100 
    }

  }



  