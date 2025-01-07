const container = document.getElementById("form-clickcollect");

fetch('../json/menu.json')
.then(response => response.json())
.then(menus => { 
    menus[0].categorie[0].burger[0].articles.forEach(burger => {

        let menuDiv = document.createElement("div");
        menuDiv.className = "produit";

        menuDiv.innerHTML = `
            <input type="radio" id="burger-${burger.id}" name="burger" value="${burger.id}" checked />
            <div class="container-img">
                <img src=".${burger.image}" class="card-img-top" alt="illustration ${burger.nom}">
            </div>
            <h2 class="border-bottom pb-2">${burger.nom}</h2>
            <p>${burger.description}</p>
            <div class="prix">${burger.price}€</div>
        `;

        container.appendChild(menuDiv);
    });
})

.catch(error => console.log("Erreur lors du chargement du fichier JSON :", error));
