// récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;

// extraction de l'id seulement 

const leId = queryString_url_id.slice(1)

// récupération de l'élément qui contiendra notre produit

const container = document.getElementById('container-product')

// récupération de notre produit grâce à son Id  + insération dans le code html 

let response = fetch (`http://localhost:3000/api/teddies/${leId}`)
.then(res => {
    if(res.ok){
        res.json().then(data => {
            const produit = document.createElement('div') //création d'une div qui contiendra notre code html
            produit.innerHTML =  //insération de notre code dans la div 
        `
            <div class="card">
            <img src="${data.imageUrl}" alt="">
            <div class="body-card">
              <div class="row">
                <h4 class="title-card">${data.name}</h4></div>
                <p class="price-card" id="test">${data.price / 100} €</p>

                  <form>
                    <label for="colors">Couleurs</label>
                    <select name="couleur" id="colors"></select> </br>

                    <label for="quantity">Quantité</label>
                    <input type="number" id="quantity" min="1" value="1"> 
                  </form>

                <p class="card-description">${data.description}</p>
            </div>
          </div>
        `
        container.appendChild(produit)    // ajoute notre div en tant qu'enfant à la div principal

        // Boucle qui nous permet de récupérer les différentes couleurs pour notre select

        for(let i = 0; i < data.colors.length; i++){
          let sel = document.getElementById('colors');
          let opt = document.createElement('option');
          opt.value = i;
          opt.text = data.colors[i];
          sel.add(opt,null);
        }

        // ------------------------------Ajout au panier --------------------------------------------//

        //récupération du bouton d'ajout au panier
        const btnEnvoyer = document.getElementById('btn-envoyer')

        // Ajout d'un évènement au clic sur le bouton
        btnEnvoyer.addEventListener('click', (e) =>{
          e.preventDefault() // annule le comportement par défault (rechargement de la page)
          const quantity = document.getElementById('quantity').value    //récupération de la valeur de l'id quantity
          const colors = document.getElementById("colors").options[document.getElementById('colors').selectedIndex].text;   // récupération du text dans les champs options
          
          let infoProduct = {  // création d'un objet qui contiendra les informations du produit séléctionner par l'utilisateur
            color : colors,
            quantity : quantity,
            name : data.name,
            price : data.price / 100,
            id : leId
          }

          // création de la variable qui stockera les keys et les values
          let productLocalStorage = JSON.parse(localStorage.getItem('produit'));

          const ajoutProduitLocalStorage = () =>{
            productLocalStorage.push(infoProduct) // ajout dans tableau l'objet et les valeurs choisi par l'utilisateur
            localStorage.setItem("produit", JSON.stringify(productLocalStorage)) // Transformation en format JSON et envois dans la key "produit" du local storage
          }
          // si il y a déjà des produits dans le local storage
          if(productLocalStorage){
            ajoutProduitLocalStorage()
          // si il n'y a pas de produit dans le local storage
          }else{
            productLocalStorage=[];
            ajoutProduitLocalStorage()
          }
          
          })
        
        // ------------------------------ Fin Ajout au panier --------------------------------------------//

        })
    }else {
        alert('erreur 404')
    }
})
