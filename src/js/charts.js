// Hämta data med Fetch API
async function fetchData() {
    const response = await fetch('/statistik_sokande_ht24.json'); 
    if (!response.ok) {
        throw new Error('Fel vid hämtning av data');
    }
    const data = await response.json(); // Omvandla JSON till JavaScript-objekt
    return data;
}

// Använd data för att skapa diagram
async function createCharts() {
    try {
        const data = await fetchData(); // Vänta på att datan hämtas innan den används

        // Kontrollera att elementen finns
        const barChartCanvas = document.getElementById('barChart');
        const pieChartCanvas = document.getElementById('pieChart');

        if (!barChartCanvas || !pieChartCanvas) {
            console.error("Ett eller flera diagram-element saknas i HTML!");
            return;
        }

        // Stapeldiagram - Kurser
        new Chart(barChartCanvas, {
            type: 'bar',
            data: {
                labels: data.courses.map(course => course.name),
                datasets: [{
                    label: 'Antal sökande',
                    data: data.courses.map(course => course.applicants),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            }
        });

        // Cirkeldiagram - Program
        new Chart(pieChartCanvas, {
            type: 'pie',
            data: {
                labels: data.programs.map(program => program.name),
                datasets: [{
                    label: 'Antal sökande',
                    data: data.programs.map(program => program.applicants),
                    backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#FF8033']
                }]
            }
        });
    } catch (error) {
        console.error("Fel vid skapande av diagram:", error);
    }
}

// Kör funktionen för att skapa diagrammen
createCharts();
