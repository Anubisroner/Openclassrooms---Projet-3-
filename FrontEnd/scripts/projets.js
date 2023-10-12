// VARIABLE DES URL
const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";

// ON LIE LE FICHIER JSON
const fetchData = async (url, callback) => {
    const res = await fetch(url)
    const data = await res.json();
    await callback(data);
}

// AFFICHER LES CATEGORIES
const showCategories = async (data) => {
    const portfolio = document.querySelector("#portfolio");
    const gallery = document.querySelector(".gallery");
    const containerUl = document.querySelector(".categories");
    const listeCategories = document.querySelector(".liste-categories");
    listeCategories.innerHTML = "";
    const btnTous = document.createElement("li");
    btnTous.classList.add("btnSelectionne", "btn");
    btnTous.setAttribute("id", 0);
    btnTous.innerText = "Tous"
    listeCategories.appendChild(btnTous);
    containerUl.appendChild(listeCategories);
    clicCategories(data);
    portfolio.insertBefore(containerUl, gallery);
    clicCouleur();
}

// AFFICHER LES PROJETS
const showProject = (data) => {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    for (const project of data) {
        const figure = document.createElement("figure");
        figure.innerHTML = `
        <img src="${project.imageUrl}" 
        alt="${project.title}">
        <figcaption>${project.title}</figcaption>
        `
        gallery.appendChild(figure);
    }
}



// CHANGEMENT DE COULEUR AU CLIC DES FILTRES
const clicCouleur = () => {
    const listeFiltres = document.querySelectorAll(".categories li");
    for (const element of listeFiltres) {
        element.addEventListener("click", () => {
            for (const element of listeFiltres) {
                element.classList.remove("btnSelectionne");
            }
            element.classList.add("btnSelectionne");
        })
    }
}

// FILTRE DE PROJETS
const clicCategories = (data) => {
    const listeCategories = document.querySelector(".liste-categories");
    for (const element of data) {
        const btnCategories = document.createElement("li");
        btnCategories.setAttribute("id", element.id);
        btnCategories.classList.add("btn");
        btnCategories.innerText = element.name;
        listeCategories.appendChild(btnCategories);
    }
}

const filtreCategories = async (btnFiltre) => {
    const res = await fetch(urlWorks);
    const data = await res.json();
    const dataFiltres = await data.filter((element) => element.category.id == btnFiltre)
    if (btnFiltre !== "0") {
        showProject(dataFiltres);
    } else {

        showProject(data);
    }
}


fetchData(urlWorks, showProject);
fetchData(urlCategories, showCategories)
    .then(() => {
        const listeFiltres = document.querySelectorAll(".categories li");
        for (const element of listeFiltres) {
            element.addEventListener("click", (e) => {
                filtreCategories(element.id);
            })
        }
    }) 
