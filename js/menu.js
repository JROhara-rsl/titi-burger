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

const containerSelectBurger         = document.getElementById("container-select-burger");
const containerSelectAccompagnement = document.getElementById("container-select-accompagnement");
const containerSelectBoisson        = document.getElementById("container-select-boisson");
const containerSelectDessert        = document.getElementById("container-select-dessert");

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
const divPrixTotal                     = document.querySelector('#prix-total');
// 2 - Fonction pour abandonner
function giveUp() {
    buttonGiveup = document.getElementById("button-giveup");  
    buttonGiveup.addEventListener("click", function(event){
        event.preventDefault();
        localStorage.clear();
        maCommande = [];
        document.location.href="../html/clickcollect.html";
        console.log(maCommande);
    })
}


// 3 - Fonction pour les boutons suivant
function fonctionNext(identifiant){
    console.log(identifiant);
    
    // Créer une condition : il faut qu'un button radio soit sélectionné
    // Seule exception, la première itération (-1)
    if (identifiant > -1) {
        let nomContainerBefore = "form-"+identifiant;
        let containerBefore = document.getElementById(nomContainerBefore);
        selectedBurger = containerBefore.querySelector('input:checked');
    }

    if (identifiant == 3) {
        document.location.href="../html/commande.html";
    } else if (identifiant == -1 || selectedBurger) {
        // Cacher la div d'intro et modifier le button
        containerIntro.setAttribute("class","desactive");
        containerStart.setAttribute("class","desactive");
        containerInfo.classList.remove('active');
        containerIntroForm.setAttribute("style", "display: flex;")

        // Sélectionner et cacher la catégorie de menu précédente
        if (identifiant > -1) {
            let nomContainerCache = "form-"+(identifiant);
            let containerCache = document.getElementById(nomContainerCache); 
            containerCache.classList.remove('active');
        }

        // Sauvegarder les données dans le localStorage 
        // Sélectioner le formulaire correspondant
        let nomContainer = "form-"+identifiant;
        let container = document.getElementById(nomContainer);

        // Sélectionner le formualire correspondant à la catégorie de menu suivant
        identifiant = parseInt(identifiant)+1;
        nomContainer = "form-"+identifiant;
        container = document.getElementById(nomContainer);
        container.classList.add('active');

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
                    <input type="radio" id="${nomCategorie}-${produit.id}" name="${nomCategorie}" value="${produit.id}" />
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

        // Générer bouton suivant
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
            container.appendChild(navigationDiv);
            giveUp()           
        }, 100);
    } else {
        // Sinon, afficher la condition de sélectionner un bouton radio
        containerInfo = document.getElementById("form-information");
        containerInfo.setAttribute("class", "active");
    }
}