const burgerMenu = document.getElementById('burger-menu');
const headMenu = document.getElementById('headmenu');


burgerMenu.addEventListener('click', () => {
    headMenu.classList.toggle('show');
});



const themeButton = document.getElementById("theme-button");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
} else {
  body.classList.add("light");
}

// När knappen klickas, växla mellan teman
themeButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");

  // Spara temat i localStorage
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
