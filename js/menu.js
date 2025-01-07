// 1 - Récupérer les div de la page dans des constantes
const buttonStart = document.getElementById("button-start");
const containerIntro = document.getElementById("partie-clickcollect");
const containerMenu = document.getElementById("partie-menu");
const containerForm = document.getElementsByClassName("form-menu");
const containerNav = document.getElementById("form-navigation");
const containerBurger = document.getElementById("form-burger");



// 2 - Préparer des bouttons next et before
let buttonNext = document.createElement("button");
buttonNext.setAttribute("id", "button-next");
buttonNext.setAttribute("class", "button-menu");
buttonNext.setAttribute("type", "button");
buttonNext.innerHTML = `Suivant`;


// 3 - Lancer le programme lorsque l'on clique sur le boutton start
buttonStart.addEventListener('click', function(event) {
    containerIntro.innerHTML = "";

    containerMenu.classList.add("active");
    
    fetch('../json/menu.json')
    .then(response => response.json())
    .then(menus => { 
        menus[0].categorie[0].burger[0].articles.forEach(burger => {

            let menuDiv = document.createElement("div");
            menuDiv.className = "produit";

            menuDiv.innerHTML = `
                <input type="radio" id="burger-${burger.id}" name="burger" value="${burger.id}" />
                <div class="container-img">
                    <img src=".${burger.image}" class="card-img-top" alt="illustration ${burger.nom}">
                </div>
                <h2 class="border-bottom pb-2">${burger.nom}</h2>
                <p>${burger.description}</p>
                <div class="prix">${burger.price}€</div>
            `;

            containerBurger.appendChild(menuDiv);
        });
    })
    .catch(error => console.log("Erreur lors du chargement du fichier JSON :", error));

    containerNav.appendChild(buttonNext);
    buttonNext.setAttribute("onclick", "fonctionNext('accompagnement')");
    setTimeout(() => {
        containerBurger.setAttribute("style", "height: 1140px;");
    }, 10);
});

// 4 - Fonction pour les boutons suivant


function fonctionNext(identifiant){
    let nomContainer = "form-"+identifiant;
    let container = document.getElementById(nomContainer);



    fetch('../json/menu.json')
    .then(response => response.json())
    .then(menus => { 
        const nomCategories = menus[0].categorie[0];
        const nomCategorie = nomCategories[identifiant];
        console.log(nomCategorie);

        nomCategorie[0].articles.forEach(produit => {
            
            let menuDiv = document.createElement("div");
            menuDiv.className = "produit";

            menuDiv.innerHTML = `
                <input type="radio" id="burger-${produit.id}" name="burger" value="${produit.id}" />
                <div class="container-img">
                    <img src=".${produit.image}" class="card-img-top" alt="illustration ${produit.nom}">
                </div>
                <h2 class="border-bottom pb-2">${produit.nom}</h2>
                <p>${produit.description}</p>
                <div class="prix">${produit.price}€</div>
            `;

            container.appendChild(menuDiv);
        });
    })
    .catch(error => console.log("Erreur lors du chargement du fichier JSON :", error));

    setTimeout(() => {
        container.setAttribute("style", "height: 1140px;");
    }, 10);
}
