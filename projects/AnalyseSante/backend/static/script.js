// par défaut on prend les données du patient 1
let subject1Id = 1;
// par défaut on prend les données du patient 2
let subject2Id = 2;
// par défaut on prend les données du patient 1 en debout immobile
let activity1Id = 0;
// par défaut on prend les données du patient 2 en debout immobile
let activity2Id = 0;

const select1 = document.getElementById("patientSelect1");
const select2 = document.getElementById("patientSelect2");
const activitySelect1 = document.getElementById("activitySelect1");
const activitySelect2 = document.getElementById("activitySelect2");

// boucle pour remplir les selects de patients (1 à 10)
for (let i = 1; i <= 10; i++) {
    let opt1 = document.createElement("option");
    opt1.value = i;
    opt1.textContent = "Patient " + i;
    select1.appendChild(opt1);

    let opt2 = document.createElement("option");
    opt2.value = i;
    opt2.textContent = "Patient " + i;
    select2.appendChild(opt2);
}

select1.value = subject1Id;
select2.value = subject2Id;

// activités
const activityLabels = [
    "Debout immobile",
    "Assis et détendu",
    "Allongé",
    "Marche",
    "Monter les escaliers",
    "Penchement de la taille vers l'avant",
    "Élévation frontale des bras",
    "Flexion des genoux (accroupissement)",
    "Vélo",
    "Jogging",
    "Course à pied",
    "Saut avant et en arrière"
];

// boucle pour remplir les selects d'activités
for (let i = 0; i < activityLabels.length; i++) {
    const optA1 = document.createElement("option");
    optA1.value = i;
    optA1.textContent = activityLabels[i];
    activitySelect1.appendChild(optA1);

    const optA2 = document.createElement("option");
    optA2.value = i;
    optA2.textContent = activityLabels[i];
    activitySelect2.appendChild(optA2);
}

activitySelect1.value = activity1Id;
activitySelect2.value = activity2Id;

// fonction pour réinitialiser un graphique (lors du changement de patient)
function resetChart(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach(d => d.data = []);
    chart.update();
}

// changements de patient et d'activité grâce aux selects
select1?.addEventListener("change", () => {
    subject1Id = Number(select1.value);
    resetChart(chart1);
});

activitySelect1?.addEventListener("change", () => {
    activity1Id = Number(activitySelect1.value);
});

select2?.addEventListener("change", () => {
    subject2Id = Number(select2.value);
    resetChart(chart2);
});

activitySelect2?.addEventListener("change", () => {
    activity2Id = Number(activitySelect2.value);
});

let refreshRate = 2000;
let timer = null;

// charts
const ctx1 = document.getElementById("chart1").getContext("2d");
const ctx2 = document.getElementById("chart2").getContext("2d");

let chart1 = new Chart(ctx1, {
    type: 'line',
    data: { labels: [], datasets: [] },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                display: true,
                labels: { color: "#333", boxWidth: 12 }
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                ticks: { maxTicksLimit: 8 },
                grid: { color: "rgba(0,0,0,0.05)" }
            },
            y: {
                grid: { color: "rgba(0,0,0,0.05)" }
            }
        }
    }
});

initDatasets(chart1);

let chart2 = new Chart(ctx2, {
    type: 'line',
    data: { labels: [], datasets: [] },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                display: true,
                labels: { color: "#333", boxWidth: 12 }
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                ticks: { maxTicksLimit: 8 },
                grid: { color: "rgba(0,0,0,0.05)" }
            },
            y: {
                grid: { color: "rgba(0,0,0,0.05)" }
            }
        }
    }
});

initDatasets(chart2);

window.chart1 = chart1;
window.chart2 = chart2;

// capteurs
const capteurLabels = [
    "alx","aly","alz",
    "glx","gly","glz",
    "arx","ary","arz",
    "grx","gry","grz"
];

// fonction pour créer les checkboxes des capteurs
function createCapteur(containerId, chart) {
    const container = document.getElementById(containerId);
    if (!container) return;

    capteurLabels.forEach((label, i) => {
        const div = document.createElement("div");
        div.className = "form-check form-switch form-check-inline";

        const id = containerId + "_" + label;

        div.innerHTML = `
            <input class="form-check-input" type="checkbox" role="switch" id="${id}" checked>
            <label class="form-check-label" for="${id}" style="cursor:pointer;">${label}</label>
        `;

        const input = div.querySelector("input");

       input.addEventListener("change", (e) => {
            chart.setDatasetVisibility(i, e.target.checked);
            chart.update('none');
});
        input.style.cursor = "pointer";

        container.appendChild(div);
    });
}


function initDatasets(chart) {
    const colors = [
        "#e74c3c","#3498db","#2ecc71","#f39c12","#9b59b6","#8e44ad",
        "#e67e22","#95a5a6","#1abc9c","#2c3e50","#16a085","#d35400"
    ];

    const labels = [
        "alx","aly","alz",
        "glx","gly","glz",
        "arx","ary","arz",
        "grx","gry","grz"
    ];

    chart.data.datasets = labels.map((l, i) => ({
        label: l,
        data: [],
        borderColor: colors[i],
        backgroundColor: colors[i],
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35
    }));

    chart.update();
}

createCapteur("capteurBox1", chart1);
createCapteur("capteurBox2", chart2);

const capteurKeys = [
    "alx","aly","alz",
    "glx","gly","glz",
    "arx","ary","arz",
    "grx","gry","grz"
];

// fonction pour ajouter les données d'un patient à son graphique
function addDataPatient(chart, data) {
    const time = new Date().toLocaleTimeString();

    if (!chart.data.labels) chart.data.labels = [];

    chart.data.labels.push(time);

    capteurKeys.forEach((key, i) => {
        if (chart.data.datasets[i]) {
            chart.data.datasets[i].data.push(data[key]);
        }
    });

    chart.update('none');
}

// requêtes asynchrones pour récupérer les données et les ajouter aux graphiques
function fetchData() {
    Promise.all([
        fetch(`/data?subject=${subject1Id}`).then(r => r.json()),
        fetch(`/data?subject=${subject2Id}`).then(r => r.json())
    ])
    .then(([data1, data2]) => {

        addDataPatient(chart1, data1);
        addDataPatient(chart2, data2);

    })
    .catch(err => console.error(err));
}

// fonction pour démarrer la boucle de rafraîchissement
function startLoop() {
    if (timer !== null) {
        clearInterval(timer);
    }

    timer = setInterval(fetchData, refreshRate);
}

// fonction pour changer le taux de rafraîchissement
function setRefreshRate(ms) {
    ms = Number(ms);
    if (ms < 100 || ms > 2000) return;

    refreshRate = ms;

    const el = document.getElementById("rateValue");
    if (el) el.innerText = ms;

    startLoop();
}

startLoop();

// gestion du slider de taux de rafraîchissement
const refreshSlider = document.getElementById("refreshRange");
if (refreshSlider) {
    refreshSlider.addEventListener("input", (e) => {
        setRefreshRate(e.target.value);
    });
}