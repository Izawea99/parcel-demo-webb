// URL till JSON-filen som innehåller kursinformationen
const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";


/* Hämtar kursdata från den angivna URL:en.
Funktionen är asynkron och använder Fetch API.
Om det uppstår ett fel returneras en tom array istället för att krascha programmet.*/
async function fetchData() {
    try {
        // Gör en begäran till URL:en och inväntar svar
        const response = await fetch(url);
        
        // Om svaret är OK, retuneras innehållet från JSON-filen.
        // Annars returneras en tom array.
        return response.ok ? await response.json() : [];
    } catch (error) {
        // Om ett fel uppstår, returnera en tom array.
        return [];
    }
}


//Renderar kursdata i en HTML-tabell
function renderTable(courses) {
    const tableBody = document.querySelector("#course-table tbody");
    tableBody.innerHTML = ""; // Rensar tabellen innan ny data läggs till

    courses.forEach(course => {
        const row = document.createElement("tr"); // Skapa en ny rad i tabellen
        row.innerHTML = `
            <td>${course.code || "-"}</td> 
            <td>${course.coursename || "-"}</td> 
            <td>${course.progression || "-"}</td>
        `;
        tableBody.appendChild(row); // Lägg till raden i tabellen
    });
}

//Filtrerar kursdata baserat på en sökterm
function filterData(courses, searchTerm) {
    return courses.filter(course =>
        course.code?.toLowerCase().includes(searchTerm) || 
        course.coursename?.toLowerCase().includes(searchTerm) || 
        course.progression?.toLowerCase().includes(searchTerm)
    );
}

//Sorterar kurslistan baserat på ett valt fält ex. kurskod, kursnamn, progression
function sortData(courses, field, sortDirection) {
    courses.sort((a, b) => {
        let valA = a[field]?.toLowerCase() || ""; // Konvertera till gemener för att undvika sorteringsproblem
        let valB = b[field]?.toLowerCase() || "";
        return sortDirection[field] ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    sortDirection[field] = !sortDirection[field]; // Växla sorteringsordningen för nästa klick
}

//Initierar webbapplikationen när sidan laddas
async function init() {
    const searchInput = document.querySelector("#search"); // Hämta sökfältet
    let coursesData = await fetchData(); // Hämta kursdata från API:et
    let sortDirection = { code: true, coursename: true, progression: true }; // Håller reda på sorteringsordning

    renderTable(coursesData); // Rendera tabellen med den hämtade kurslistan

    // Lägg till event listeners för sorteringsknappar
    ["code", "coursename", "progression"].forEach(field => {
        const sortButton = document.querySelector(`#sort-${field}`);
        if (sortButton) { 
            sortButton.addEventListener("click", () => {
                sortData(coursesData, field, sortDirection); // Sortera tabellen
                renderTable(coursesData); // Uppdatera tabellen efter sortering
            });
        }
    });

    // Lägg till en event listener för sökfunktionen
    searchInput.addEventListener("input", () => {
        renderTable(filterData(coursesData, searchInput.value.toLowerCase())); // Filtrera och rendera tabellen baserat på sökning
    });
}

// Exporterar init-funktionen för att kunna importeras och användas i main.js
export default init;


