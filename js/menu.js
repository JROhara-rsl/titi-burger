// 1 - Récupérer les div de la page dans des constantes
// *****************************************************

const containerIntro = document.getElementById("partie-clickcollect");
const form = document.getElementById("form-clickcollect");
const containerIntroForm = document.getElementById("container-intro-form");
const containerMenu = document.getElementById("partie-menu");
const containerForm = document.getElementsByClassName("form-menu");
const containerStart  = document.getElementById("section-nav");
const containerBurger = document.getElementById("form-0");
let buttonNext = document.getElementById("button-next");
let buttonGiveup;
let containerInfo = document.getElementById("form-information");

const containerSelectBurger         = document.getElementById("container-select-1");
const containerSelectAccompagnement = document.getElementById("container-select-2");
const containerSelectBoisson        = document.getElementById("container-select-3");
const containerSelectDessert        = document.getElementById("container-select-4");

const imageSelectBurger             = document.getElementById('image-select-burger');
const imageSelectAccompagnement     = document.getElementById('image-select-accompagnement');
const imageSelectBoisson            = document.getElementById('image-select-boisson');
const imageSelectDessert            = document.getElementById('image-select-dessert');

const nomSelectBurger               = containerSelectBurger.querySelector('h2');
const nomSelectAccompagnement       = containerSelectAccompagnement.querySelector('h2');
const nomSelectBoisson              = containerSelectBoisson.querySelector('h2');
const nomSelectDessert              = containerSelectDessert.querySelector('h2');

const prixSelectBurger              = containerSelectBurger.querySelector('.prix');
const prixSelectAccompagnement      = containerSelectAccompagnement.querySelector('.prix');
const prixSelectBoisson             = containerSelectBoisson.querySelector('.prix');
const prixSelectDessert             = containerSelectDessert.querySelector('.prix');
const divPrixTotal                  = document.querySelector('#prix-total');

// 2 - Fonction bouton commencer
function fonctionStart() {
    containerIntro.setAttribute("class","desactive");
    containerStart.setAttribute("class","desactive");
    containerIntroForm.setAttribute("style", "display: flex;")

    let container = document.getElementById('form-0');
    container.classList.add('active');

    fetch('../json/menu.json')
        .then(response => response.json())
        .then(menus => { 
            // Récupérer numéro et nom de la catégorie
            let numCategorie = menus[0].categorie[0];
            let nomCategorie = menus[0].categorie[0].nom;

            numCategorie.articles.forEach(produit => {   
                let menuDiv = document.createElement("div");
                menuDiv.className = "produit";
                menuDiv.innerHTML = `
                    <input type="radio" id="${nomCategorie}-${produit.id}" name="${nomCategorie}" value="${produit.nom}" />
                    <label id="label-${nomCategorie}-${produit.id}" for="${nomCategorie}-${produit.id}">
                        <div class="container-img">
                            <img src=".${produit.image}" class="card-img-top" alt="illustration ${produit.nom}">
                        </div>
                        <h2>${produit.nom}</h2>
                        <p>${produit.description}</p>
                        <div class="prix" value="${produit.price}">${produit.price}€</div>
                    </label>
                `;

                container.appendChild(menuDiv);
            });
        })
        .catch(error => console.log("Erreur lors du chargement du fichier JSON :", error));

        createButtonSuivant(0);
}

// 3 - Fonction pour les boutons suivant
function fonctionNext(identifiant){    
    // Créer une condition : il faut qu'un button radio soit sélectionné
    // Seule exception, la première itération (-1)
    if (identifiant > -1) {
        let nomContainerBefore = "form-"+identifiant;
        let containerBefore = document.getElementById(nomContainerBefore);
        inputSelected = containerBefore.querySelector('input:checked');
        containerSelection = document.getElementById("container-selection");
    }

    if (identifiant == 3) {
        // Au bout de 3 itération sur l'identifiant, le menu est complet
        // Donc on passe à la commande :
        document.location.href="../html/commande.html";
    } else if (menuId || inputSelected) {
        containerInfo.classList.remove('active');

        // Sélectionner et cacher la catégorie de menu précédente
        let nomContainerCache = "form-"+(identifiant);
        let containerCache = document.getElementById(nomContainerCache); 
        if (containerCache) {
            containerCache.classList.remove('active');
        }

        // Sélectionner le formulaire correspondant à la catégorie de menu suivant
        identifiant = parseInt(identifiant)+1;
        nomContainer = "form-"+identifiant;
        container = document.getElementById(nomContainer);
        container.classList.add('active');

        selectionActive(identifiant)
        
        // Importer les articles de la bonne catégorie via la librairie JSON 
        fetch('../json/menu.json')
        .then(response => response.json())
        .then(menus => { 
            // Récupérer numéro et nom de la catégorie
            let numCategorie = menus[0].categorie[identifiant];
            let nomCategorie = menus[0].categorie[identifiant].nom;

            numCategorie.articles.forEach(produit => {   
                let menuDiv = document.createElement("div");
                menuDiv.className = "produit";
                menuDiv.innerHTML = `
                    <input type="radio" id="${nomCategorie}-${produit.id}" name="${nomCategorie}" value="${produit.nom}" />
                    <label id="label-${nomCategorie}-${produit.id}" for="${nomCategorie}-${produit.id}">
                        <div class="container-img">
                            <img src=".${produit.image}" class="card-img-top" alt="illustration ${produit.nom}">
                        </div>
                        <h2>${produit.nom}</h2>
                        <p>${produit.description}</p>
                        <div class="prix" value="${produit.price}">${produit.price}€</div>
                    </label>
                `;
                container.appendChild(menuDiv);
            });
        })
        .catch(error => console.log("Erreur lors du chargement du fichier JSON :", error));

        createButtonSuivant(identifiant);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    } else {
        // Sinon, afficher la condition de sélectionner un bouton radio
        containerInfo = document.getElementById("form-information");
        containerInfo.setAttribute("class", "active");
    }
}

// 4 - Créer le bouton suivant 
function createButtonSuivant(identifiant) {
    let navigationDiv = document.createElement("div");
    navigationDiv.setAttribute("id", "partie-navigation");
    navigationDiv.innerHTML = `
                                <div class="container-navitation">
                                    <div class="container-button">
                                        <button id="button-giveup" class="button-menu">Abandonner</button>
                                        <button id="button-next" class="button-menu" type="button" onClick="fonctionNext(${identifiant})">Suivant</button>
                                    </div>
                                </div>`
    setTimeout(() => {
            // Récupérer l'identifiant du container
            nomContainer = "form-"+identifiant;
            container = document.getElementById(nomContainer);

            container.appendChild(navigationDiv);
            createButtonGiveUp()  
                     
        }, 400);                            
}   

// 5 - Créer un bouton abandonner
function createButtonGiveUp() {
    buttonGiveup = document.getElementById("button-giveup");  
    buttonGiveup.addEventListener("click", function(event){
        event.preventDefault();
        localStorage.clear();
        maCommande = [];
        document.location.href="../html/clickcollect.html";
        console.log(maCommande);
    })
}

// 6 - Bouton modifier commande
function buttonModifyCommande(identifiant) {
    document.location.href=`../html/clickcollect.html?id=${identifiant}`;
}

function getMenuIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id;
}

const menuId = getMenuIdFromUrl();

if(menuId) {
    containerIntro.setAttribute("class","desactive");
    containerStart.setAttribute("class","desactive");
    containerIntroForm.setAttribute("style", "display: flex;")

    fonctionNext(menuId);
}

// 7 - Sélection active
function selectionActive(identifiant) {
    const containerSection = document.getElementById('container-selection');
    const divSelected = containerSection.querySelector('.active');
    if (divSelected) {
        divSelected.classList.toggle("active");
    }

    // Activer aggrandissement sur le container sélectionné
    const incrSelect = identifiant + 1;
    const containerSelect = document.getElementById("container-select-"+incrSelect);
    containerSelect.classList.toggle("active");
}
//selectionActive(0);