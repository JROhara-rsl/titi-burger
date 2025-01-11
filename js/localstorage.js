// Récupérer les valeurs dans le localstorage
// *****************************************************

var maCommande = {
    burger: {
        nom: "",
        image: "", 
        prix: ""
    },
    accompagnement: {
        nom: "",
        image: "",
        prix: ""
    },
    boisson: {
        nom: "",
        image: "",
        prix: ""
    },
    dessert:{
        nom: "",
        image: "",
        prix: ""
    }
  };

// SELECTIONNER LES ELEMENTS DE LA FACTURE FINALE



// Mettre à jour les container de la commande sélectionnée
// ************************************************************

function majContainerSelection() {    
    imageSelectBurger.setAttribute("style","background-image: url('" + maCommande.burger.image + "');");
    imageSelectAccompagnement.setAttribute("style","background-image: url('" + maCommande.accompagnement.image + "');");
    imageSelectBoisson.setAttribute("style","background-image: url('" + maCommande.boisson.image + "');");
    imageSelectDessert.setAttribute("style","background-image: url('" + maCommande.dessert.image + "');");

    if (document.getElementById('page-commande')) {
        nomSelectBurger.innerHTML = maCommande.burger.nom;
        nomSelectAccompagnement.innerHTML = maCommande.accompagnement.nom;
        nomSelectBoisson.innerHTML = maCommande.boisson.nom;
        nomSelectDessert.innerHTML = maCommande.dessert.nom;

        prixSelectBurger.innerHTML = maCommande.burger.prix;
        prixSelectAccompagnement.innerHTML = maCommande.accompagnement.prix;
        prixSelectBoisson.innerHTML = maCommande.boisson.prix;
        prixSelectDessert.innerHTML = maCommande.dessert.prix;

        let prixTotal = parseInt(maCommande.burger.prix.slice(0, -1))
                        + parseInt(maCommande.accompagnement.prix.slice(0, -1))
                        + parseInt(maCommande.boisson.prix.slice(0, -1))
                        + parseInt(maCommande.dessert.prix.slice(0, -1)); 
        divPrixTotal.innerHTML = prixTotal + "€";    
    }
}
  

// Charger les données depuis le localStorage au démarrage
// ************************************************************ 

document.addEventListener("DOMContentLoaded", function() {
    const savedCommande = localStorage.getItem("maCommande");
    //localStorage.removeItem("maCommande");
    if (savedCommande) {
      maCommande = JSON.parse(savedCommande);
    }

    document.body.addEventListener('change', function(event) {
        if (event.target && event.target.type === "radio") {
            // Récupérer le nom et la valeur de l'input radio sélectionné
            const name = event.target.name;
            const value = event.target.value; 
            const id = event.target.id
            const label = document.getElementById("label-"+id);
            const img = label.querySelector('img');
            const prix = label.querySelector('.prix').innerHTML;
            
            // Mettre à jour maCommande avec la nouvelle valeur
            maCommande[name].nom = value;
            maCommande[name].image = img.src;
            maCommande[name].prix = prix;
            
            // Sauvegarder dans le localStorage
            localStorage.setItem("maCommande", JSON.stringify(maCommande));

            //console.log("Commande de " +  name + " mise à jour :", maCommande[name]);
            //console.log(maCommande);
            majContainerSelection();
        }
    });

    majContainerSelection();
});


