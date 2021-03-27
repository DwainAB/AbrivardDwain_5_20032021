// récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;

console.log(queryString_url_id);

// extraction de l'id seulement 

const leId = queryString_url_id.slice(1)
console.log(leId );

//const objetSelectionner = response.find((element) => element.leId === _id)
const container = document.getElementById('container-product')

let response = fetch (`http://localhost:3000/api/teddies/${leId}`)
.then(res => {
    if(res.ok){
        res.json().then(data => {
            document.createElement('div')
            const produit = document.createElement('div')
            produit.innerHTML = 
        `
            <div class="card">
            <img src="${data.imageUrl}" alt="">
            <div class="body-card">
              <div class="row">
                <h4 class="title-card">${data.name}</h4></div>
                <p class="price-card">${data.price / 100} €</p>
                  <label for="colors">Couleurs</label>

                    <select name="couleur"   id="colors">
                      <option value="option1"> ${data.colors[1]}</option>
                      <option value="option1"> ${data.colors[2]}</option>
                      <option value="option1"> ${data.colors[3]}</option>
                      <option value="option1"> ${data.colors[4]}</option>
                    </select>

                    <form>
                      <label for="quantity"></label>
                      <input type="number" id="quantity" min="1" value="1"> 
                    </form>

                <p class="card-description">${data.description}</p>
            </div>
          </div>
        `
        container.appendChild(produit)
        })
    }else {
        alert('erreur 404')
    }
})