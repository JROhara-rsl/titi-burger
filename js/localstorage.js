// Récupérer les valeurs dans le localstorage
// *****************************************************

var maCommande = {
    burger: {
        nom: "",
        image: ""
    },
    accompagnement: {
        nom: "",
        image: ""
    },
    boisson: {
        nom: "",
        image: ""
    },
    dessert:{
        nom: "",
        image: ""
    }
  };

// Charger les données depuis le localStorage au démarrage
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
            console.log(label);
            
            // Mettre à jour maCommande avec la nouvelle valeur
            maCommande[name].nom = value;
            maCommande[name].image = img.src;

            // Sauvegarder dans le localStorage
            localStorage.setItem("maCommande", JSON.stringify(maCommande));

            //console.log("Commande de " +  name + " mise à jour :", maCommande[name]);
            //console.log(maCommande);
            
        }
    });
});


