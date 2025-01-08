// 1 - Récupérer les div de la page dans des constantes
//const buttonStart = document.getElementById("button-start");
const containerIntro = document.getElementById("partie-clickcollect");
const containerIntroForm = document.getElementById("container-intro-form");
const containerMenu = document.getElementById("partie-menu");
const containerForm = document.getElementsByClassName("form-menu");
const containerNav  = document.getElementById("form-navigation");
const containerBurger = document.getElementById("form-0");
const buttonNext = document.getElementById("button-next");

const containerSelectBurger         = document.getElementById("container-select-burger");
const containerSelectAccompagnement = document.getElementById("container-select-accompagnement");
const containerSelectBoisson        = document.getElementById("container-select-boisson");
const containerSelectDessert        = document.getElementById("container-select-dessert");


let compteur = 0;

// 2 - Récupérer les valeurs du formulaire
let baliseBurger;
let burgerSelect;
let baliseAccompagnement;
let accompagnementSelect;

function baliseBurgerSelect() {
    baliseBurger = document.querySelectorAll('input[name="burger"]');
    for (let i = 0; i < baliseBurger.length; i++) {
        if (baliseBurger[i].checked) {
            burgerSelect = baliseBurger[i].value
            break
        }
    }
    console.log(burgerSelect) 
}

function baliseAccompagnementSelect() {
    baliseAccompagnement = document.querySelectorAll('input[name="accompagnement"]');
    for (let i = 0; i < baliseAccompagnement.length; i++) {
        if (baliseAccompagnement[i].checked) {
            accompagnementSelect = baliseAccompagnement[i].value
            break
        }
    }
    console.log(accompagnementSelect) 
}

// 3 - Fonction pour les boutons suivant
function fonctionNext(identifiant){
    // Vider la div d'intro et modifier le button
    containerIntro.innerHTML = "";
    buttonNext.innerHTML = 'Suivant';
    containerIntroForm.setAttribute("style", "display: flex;")

    // Additionner l'identifiant au compteur
    identifiant = parseInt(identifiant)+compteur;
    console.log(identifiant);

    // Sélectionner la div correspondante à la catégorie de menu  
    let nomContainer = "form-"+identifiant;
    let container = document.getElementById(nomContainer);
    container.classList.add('active');

    // Sélectionner et cacher la catégorie de menu précédente
    if (identifiant > 0) {
        baliseBurgerSelect();
        let nomContainerCache = "form-"+(identifiant-1);
        let containerCache = document.getElementById(nomContainerCache); 
        containerCache.classList.remove('active');
    }

    // Fonction pour afficher le produit sélectionné
    if (identifiant == 1) {
        baliseBurgerSelect();
        if (burgerSelect === 'dark-burger') {
            containerSelectBurger.setAttribute("style","background-image: url('../assets/images/hamburger-noir.jpg')");
        } else if (burgerSelect === 'original-titi') {
            containerSelectBurger.setAttribute("style","background-image: url('../assets/images/hamburger-cheese.jpg')");
        } else if (burgerSelect === 'veggie-burger') {
            containerSelectBurger.setAttribute("style","background-image: url('../assets/images/hamburger-vegetal.jpg')");
        } else if (burgerSelect === 'big-big') {
            containerSelectBurger.setAttribute("style","background-image: url('../assets/images/hamburger-double.jpg')");
        }
    } else if (identifiant == 2) {
        baliseAccompagnementSelect()
        if (accompagnementSelect === 'frites') {
            containerSelectAccompagnement.setAttribute("style","background-image: url('../assets/images/frites.jpg')");
        } else if (accompagnementSelect === 'frites-patates-douces') {
            containerSelectAccompagnement.setAttribute("style","background-image: url('../assets/images/frites-patate-douce.jpg')");
        } else if (accompagnementSelect === 'salade') {
            containerSelectAccompagnement.setAttribute("style","background-image: url('../assets/images/salade.jpg')");
        } else if (accompagnementSelect === 'mais-frit') {
            containerSelectAccompagnement.setAttribute("style","background-image: url('../assets/images/mais.jpg')");
        }
    }

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