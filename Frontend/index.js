const container = document.getElementById('products-container') //


fetch ('http://localhost:3000/api/teddies')
.then(res => {
    if(res.ok){
        res.json().then(data => {
         data.forEach(element => {
            document.createElement("div")
            const carte = document.createElement('div')
            carte.classList.add('col-lg-4')
            carte.classList.add('col-sm-6')
                carte.innerHTML= 
                `
                            <div class="card mt-4 mt-lg-0">
                                <img class='produit' src='${element.imageUrl}' alt='ours en peluche'/>
                                <div class='card-body'>
                                    <h4 class='card-title'>${element.name}</h4>
                                    <p>${element.price / 100} € </p>
                                    <a href="produit.html?${element._id}" class="stretched-link"></a> 
                                </div>
                            </div>
                `
            container.appendChild(carte)
         });
        })
    } else{
        alert('erreur 404')
    }
})

