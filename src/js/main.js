const burgerMenu = document.getElementById('burger-menu');
const headMenu = document.getElementById('headmenu');


burgerMenu.addEventListener('click', () => {
    headMenu.classList.toggle('show');
});


import init from "./courses.js"; // Importera init-funktionen från courses.js

// Kör init-funktionen när sidan har laddats
document.addEventListener("DOMContentLoaded", init);

