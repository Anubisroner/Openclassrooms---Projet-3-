// ON VERIFIE SI ON EST CONNECTER POUR AFFICHER LOGIN OU LOGOUT
document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.querySelector(".login");
  const logoutLink = document.querySelector(".logout");
  const categories = document.querySelector(".categories");
  const logoModifier = document.querySelector(".logo-modifier");
  const editionMod = document.querySelector("#logged")

  const isConnected = sessionStorage.getItem("isConnected");

  if (isConnected === "true") {
    loginLink.style.display = "none";
    logoutLink.style.display = "block";
    categories.style.display = "none";
    logoModifier.style.display = "block";
    editionMod.style.display = "flex";
  } else {
    loginLink.style.display = "block";
    logoutLink.style.display = "none";
    logoModifier.style.display = "none";
  }

  // EVENT AU CLIC SUR LOGOUT POUR SE DECONNECTER
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.removeItem("isConnected");
    window.location.replace("index.html");
  });
});


