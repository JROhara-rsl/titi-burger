// 1 - Récupérer les div de la page dans des constantes
//const buttonStart = document.getElementById("button-start");
const containerIntro = document.getElementById("partie-clickcollect");
const containerMenu = document.getElementById("partie-menu");
const containerForm = document.getElementsByClassName("form-menu");
const containerNav  = document.getElementById("form-navigation");
const containerBurger = document.getElementById("form-0");
const buttonNext = document.getElementById("button-next");

let compteur = 0;

// 2 - Fonction pour les boutons suivant
function fonctionNext(identifiant){
    // Vider la div d'intro et modifier le button
    containerIntro.innerHTML = "";
    buttonNext.innerHTML = 'Suivant';

    // Additionner l'identifiant au compteur
    identifiant = parseInt(identifiant)+compteur;
    console.log(identifiant);

    // Sélectionner la div correspondante à la catégorie de menu  
    let nomContainer = "form-"+identifiant;
    let container = document.getElementById(nomContainer);
    container.classList.add('active');

    // Sélectionner et cacher la catégorie de menu précédente
    if (identifiant > 0) {
        let nomContainerCache = "form-"+(identifiant-1);
        let containerCache = document.getElementById(nomContainerCache); 
        containerCache.classList.remove('active');
    }

    // Importer les articles de la bonne catégorie via la librairie JSON 
    fetch('../json/menu.json')
    .then(response => response.json())
    .then(menus => { 
        const nomCategories = menus[0].categorie[identifiant];
        console.log(nomCategories);

        nomCategories.articles.forEach(produit => {
            
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

    }, 10);

    compteur++;
}
