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
let containerInfo = document.getElementById("form-information");

const containerSelectBurger         = document.getElementById("container-select-burger");
const containerSelectAccompagnement = document.getElementById("container-select-accompagnement");
const containerSelectBoisson        = document.getElementById("container-select-boisson");
const containerSelectDessert        = document.getElementById("container-select-dessert");



// 2 - Récupérer les valeurs du formulaire
let baliseBurger;
let burgerSelect;
let baliseAccompagnement;
let accompagnementSelect;
let baliseBoisson;
let boissonSelect;
let baliseDessert;
let dessertSelect;

let allBalises;

function baliseBurgerSelect() {
    baliseBurger = document.querySelectorAll('input[name="burger"]');
    for (let i = 0; i < baliseBurger.length; i++) {
        if (baliseBurger[i].checked) {
            burgerSelect = baliseBurger[i].value
            baliseBurger[i].value = sessionStorage.getItem('maCommande');
            break
        }
    }
}

function baliseAccompagnementSelect() {
    baliseAccompagnement = document.querySelectorAll('input[name="accompagnement"]');
    for (let i = 0; i < baliseAccompagnement.length; i++) {
        if (baliseAccompagnement[i].checked) {
            accompagnementSelect = baliseAccompagnement[i].value
            break
        }
    }
}

function baliseBoissonSelect() {
    baliseBoisson = document.querySelectorAll('input[name="boisson"]');
    for (let i = 0; i < baliseBoisson.length; i++) {
        if (baliseBoisson[i].checked) {
            boissonSelect = baliseBoisson[i].value
            break
        }
    }
}

function baliseDessertSelect() {
    baliseDessert = document.querySelectorAll('input[name="dessert"]');
    for (let i = 0; i < baliseDessert.length; i++) {
        if (baliseDessert[i].checked) {
            dessertSelect = baliseDessert[i].value
            break
        }
    }
}

// 3 - Fonction pour les boutons suivant
function fonctionNext(identifiant){
    // Créer une condition : il faut qu'un button radio soit sélectionné
    // Seule exception, la première itération (-1)
    if (identifiant > -1) {
        let nomContainerBefore = "form-"+identifiant;
        let containerBefore = document.getElementById(nomContainerBefore);
        allBalises = containerBefore.querySelectorAll('input');

        var isBalises = Boolean(false);
        for (let i = 0; i < allBalises.length; i++) {
            if (allBalises[i].checked) {
                isBalises = true;
            }
        }
    }

    if (identifiant == -1 || isBalises) {
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
        
        /*if (identifiant > -1) {
            // Récupérer numéro et nom de la catégorie
            let nomCategorieCommande = maCommande[identifiant];
            if      (identifiant== 0) {   numCategorieCommande = 'burger';   }
            else if (identifiant== 1) {   numCategorieCommande = 'accompagnement';   }
            else if (identifiant== 2) {   numCategorieCommande = 'boisson';   }
            else if (identifiant== 3) {   numCategorieCommande = 'dessert';   }
              
            form.elements[identifiant].forEach(radio => {
                if (elements[identifiant].checked) {
                    nomCategorieCommande.choix = form.elements[identifiant].value;
                    localStorage.setItem("maCommande", JSON.stringify(maCommande));
                }
            })

            console.log(nomCategorieCommande.choix);
            //console.log(maCommande[identifiant])
            //console.log(form.elements[identifiant].value);
        }*/

        // Sélectionner le formualire correspondant à la catégorie de menu suivant
        identifiant = parseInt(identifiant)+1;
        nomContainer = "form-"+identifiant;
        container = document.getElementById(nomContainer);
        container.classList.add('active');

        
        

        // Fonction pour afficher le produit sélectionné
        /*if (identifiant == 1) {
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
        } else if (identifiant == 3) {
            baliseBoissonSelect()
            if (boissonSelect === 'jus-citron') {
                containerSelectBoisson.setAttribute("style","background-image: url('../assets/images/limonade.jpg')");
            } else if (boissonSelect === 'coca-cola') {
                containerSelectBoisson.setAttribute("style","background-image: url('../assets/images/coca-cola.jpg')");
            } else if (boissonSelect === 'limonade-menthe') {
                containerSelectBoisson.setAttribute("style","background-image: url('../assets/images/limonade-menthe.jpg')");
            } else if (boissonSelect === 'jus-pomme') {
                containerSelectBoisson.setAttribute("style","background-image: url('../assets/images/jus-de-pomme.jpg')");
            }
        } else if (identifiant == 4) {
            baliseDessertSelect()
            if (dessertSelect === 'muffins') {
                containerSelectDessert.setAttribute("style","background-image: url('../assets/images/muffin.jpg')");
            } else if (dessertSelect === 'tiramisu') {
                containerSelectDessert.setAttribute("style","background-image: url('../assets/images/tiramisu.jpg')");
            } else if (dessertSelect === 'gaufres') {
                containerSelectDessert.setAttribute("style","background-image: url('../assets/images/gauffres.jpg')");
            } else if (dessertSelect === 'pancakes') {
                containerSelectDessert.setAttribute("style","background-image: url('../assets/images/pancakes.jpg')");
            }
        }*/

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
                    <label for="${nomCategorie}-${produit.id}">
                        <div class="container-img">
                            <img src=".${produit.image}" class="card-img-top" alt="illustration ${produit.nom}">
                        </div>
                        <h2 class="border-bottom pb-2">${produit.nom}</h2>
                        <p>${produit.description}</p>
                        <div class="prix">${produit.price}€</div>
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
                                        <button id="button-next" class="button-menu" type="button" onClick="fonctionNext(${identifiant})">Suivant</button>
                                    </div>
                                </div>`
        setTimeout(() => {
            container.appendChild(navigationDiv);
        }, 100);
    } else {
        containerInfo = document.getElementById("form-information");
        containerInfo.setAttribute("class", "active");
    }
}

