document.addEventListener('DOMContentLoaded', function() {
    let isAnalyzing = false;
    let startTime = null;
    let timerInterval = null;
    let refreshRate = 1000;
    let dataInterval = null;
    let sessionHistory = [];
    
    // Stats tracking
    let sessionData = {
        id: null,
        heartRates: [],
        intensities: [],
        stabilityScores: [],
        startTime: null,
        duration: 0,
        rawSamples: [],
        activityName: "",
        patientId: ""
    };

    const elements = {
        patientSelect: document.getElementById('patientSelect'),
        activitySelect: document.getElementById('activitySelect'),
        refreshRange: document.getElementById('refreshRange'),
        rateValue: document.getElementById('rateValue'),
        startBtn: document.getElementById('startBtn'),
        stopBtn: document.getElementById('stopBtn'),
        statusDot: document.getElementById('statusDot'),
        statusText: document.getElementById('statusText'),
        timer: document.getElementById('sessionTimer'),
        reportArea: document.getElementById('reportArea'),
        exportBtn: document.getElementById('exportBtn'),
        historyArea: document.getElementById('historyArea'),
        historyList: document.getElementById('historyList'),
        kpis: {
            avgHR: document.getElementById('avgHeartRate'),
            maxInt: document.getElementById('maxIntensity'),
            calories: document.getElementById('caloriesBurned'),
            stability: document.getElementById('stabilityScore')
        }
    };

    // Initialize Toast Container
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    function showToast(message, icon = 'alert-triangle') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        lucide.createIcons({ root: toast });
        
        // Trigger reflow to start animation
        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    const activityLabels = [
        "Debout immobile", "Assis et détendu", "Allongé", "Marche",
        "Monter les escaliers", "Penchement de la taille", "Élévation des bras",
        "Flexion des genoux", "Vélo", "Jogging", "Course à pied", "Saut"
    ];

    // Init Selects
    for (let i = 1; i <= 10; i++) {
        const opt = document.createElement('option');
        opt.value = i; opt.textContent = `Patient ${i}`;
        elements.patientSelect.appendChild(opt);
    }
    activityLabels.forEach((label, i) => {
        const opt = document.createElement('option');
        opt.value = i; opt.textContent = label;
        elements.activitySelect.appendChild(opt);
    });

    // Charts
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
            x: { display: false },
            y: { grid: { color: 'rgba(0,0,0,0.05)' } }
        },
        plugins: { legend: { display: true, position: 'top', labels: { boxWidth: 10, font: { family: 'Outfit' } } } }
    };

    const accChart = new Chart(document.getElementById('accChart').getContext('2d'), {
        type: 'line',
        data: { labels: [], datasets: [
            { label: 'X', data: [], borderColor: '#d97757', borderWidth: 2, pointRadius: 0, tension: 0.4 },
            { label: 'Y', data: [], borderColor: '#006aff', borderWidth: 2, pointRadius: 0, tension: 0.4 },
            { label: 'Z', data: [], borderColor: '#00c853', borderWidth: 2, pointRadius: 0, tension: 0.4 }
        ]},
        options: commonOptions
    });

    const gyroChart = new Chart(document.getElementById('gyroChart').getContext('2d'), {
        type: 'line',
        data: { labels: [], datasets: [
            { label: 'Pitch', data: [], borderColor: '#7000ff', borderWidth: 2, pointRadius: 0, tension: 0.4 },
            { label: 'Roll', data: [], borderColor: '#ff6d00', borderWidth: 2, pointRadius: 0, tension: 0.4 },
            { label: 'Yaw', data: [], borderColor: '#00f2ff', borderWidth: 2, pointRadius: 0, tension: 0.4 }
        ]},
        options: commonOptions
    });

    // Logic
    function startAnalysis() {
        isAnalyzing = true;
        startTime = Date.now();
        sessionData = { 
            id: Date.now(),
            heartRates: [], 
            intensities: [], 
            stabilityScores: [], 
            startTime: startTime, 
            duration: 0, 
            rawSamples: [],
            activityName: activityLabels[elements.activitySelect.value],
            patientId: elements.patientSelect.value
        };
        
        elements.startBtn.disabled = true;
        elements.stopBtn.disabled = false;
        elements.statusDot.classList.add('active');
        elements.statusText.textContent = "Analyse en cours...";
        elements.reportArea.style.display = 'none';

        // Clear charts
        accChart.data.labels = []; accChart.data.datasets.forEach(d => d.data = []); accChart.update();
        gyroChart.data.labels = []; gyroChart.data.datasets.forEach(d => d.data = []); gyroChart.update();

        // Timer
        timerInterval = setInterval(updateTimer, 1000);
        // Data loop
        dataInterval = setInterval(collectData, refreshRate);
        showToast("Acquisition démarrée", "play-circle");
    }

    function stopAnalysis() {
        isAnalyzing = false;
        clearInterval(timerInterval);
        clearInterval(dataInterval);
        
        elements.startBtn.disabled = false;
        elements.stopBtn.disabled = true;
        elements.statusDot.classList.remove('active');
        elements.statusText.textContent = "Analyse terminée";
        
        // Save to history
        if (sessionData.rawSamples.length > 0) {
            sessionHistory.unshift({...sessionData});
            updateHistoryUI();
        }
        
        generateReport();
        showToast("Acquisition terminée", "check-circle");
    }

    function updateTimer() {
        const diff = Date.now() - startTime;
        const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        elements.timer.textContent = `Session : ${h}:${m}:${s}`;
        sessionData.duration = Math.floor(diff / 1000);
    }

    let alertTriggered = false;

    function collectData() {
        const actIdx = parseInt(elements.activitySelect.value);
        const time = new Date().toLocaleTimeString();
        const timeElapsed = (Date.now() - startTime) / 1000;
        
        let baseFreq = 0.2;
        let amplitude = 0.1;
        let baseHr = 70;
        
        if (actIdx === 3 || actIdx === 4) { 
            baseFreq = 1.8; amplitude = 2.0; baseHr = 100;
        } else if (actIdx >= 9) { 
            baseFreq = 3.0; amplitude = 4.5; baseHr = 145;
        } else if (actIdx === 8) { 
            baseFreq = 1.5; amplitude = 1.0; baseHr = 120;
        } else { 
            baseFreq = 0.5; amplitude = 0.2; baseHr = 65;
        }

        const wave = Math.sin(timeElapsed * Math.PI * 2 * baseFreq);
        const noise = () => (Math.random() - 0.5) * 0.5;
        
        const accData = [
            wave * amplitude * 0.3 + noise(), 
            wave * amplitude * 0.8 + noise(), 
            9.81 + wave * amplitude * 0.5 + noise() 
        ];
        
        const gyroData = [
            wave * amplitude * 0.2 + noise(),
            Math.cos(timeElapsed * Math.PI * 2 * baseFreq) * amplitude * 0.3 + noise(),
            noise() * 0.5
        ];

        const currentHr = baseHr + (Math.random() * 5 - 2.5);
        const currentIntensity = (Math.abs(accData[0]) + Math.abs(accData[1]) + Math.abs(accData[2] - 9.81)) / 9.81;

        if (currentHr > 160 && !alertTriggered) {
            showToast("Alerte: Rythme cardiaque critique détecté!", "alert-triangle");
            alertTriggered = true;
            setTimeout(() => alertTriggered = false, 10000);
        }

        sessionData.rawSamples.push({ time: timeElapsed.toFixed(1), timeStr: time, acc: accData, gyro: gyroData, hr: currentHr, intensity: currentIntensity });

        [accChart, gyroChart].forEach((chart, idx) => {
            const currentData = idx === 0 ? accData : gyroData;
            if (chart.data.labels.length > 50) {
                chart.data.labels.shift();
                chart.data.datasets.forEach(d => d.data.shift());
            }
            chart.data.labels.push(time);
            chart.data.datasets.forEach((d, i) => d.data.push(currentData[i]));
            chart.update('none');
        });

        sessionData.heartRates.push(currentHr);
        sessionData.intensities.push(currentIntensity);
        sessionData.stabilityScores.push(Math.max(0, 100 - (currentIntensity * 10) + noise() * 2));

        elements.kpis.avgHR.textContent = `${Math.round(currentHr)} BPM`;
        elements.kpis.maxInt.textContent = `${currentIntensity.toFixed(2)} G`;
        const calories = (sessionData.duration * (currentHr / 100) * 0.1).toFixed(1);
        elements.kpis.calories.textContent = `${calories} kcal`;
        elements.kpis.stability.textContent = `${Math.round(sessionData.stabilityScores[sessionData.stabilityScores.length-1])}%`;
    }

    function generateReport() {
        elements.reportArea.style.display = 'block';
        document.getElementById('finalDuration').textContent = `${sessionData.duration} secondes`;
        document.getElementById('finalActivity').textContent = sessionData.activityName;
        
        const avgHR = Math.round(sessionData.heartRates.reduce((a,b) => a+b, 0) / sessionData.heartRates.length) || 0;
        const maxInt = Math.max(...sessionData.intensities, 0).toFixed(2);
        const stress = avgHR > 140 ? "Intense (Cardio soutenu)" : avgHR > 90 ? "Modéré (Activité standard)" : "Optimal (Phase de repos)";
        document.getElementById('stressLevel').textContent = stress;
        
        const avgStability = Math.round(sessionData.stabilityScores.reduce((a,b) => a+b, 0) / sessionData.stabilityScores.length) || 0;
        
        const summary = `Synthèse Clinique : Le Patient n°${sessionData.patientId} a complété une session de monitoring de ${sessionData.duration}s en contexte de "${sessionData.activityName}". Le rythme cardiaque moyen enregistré est de ${avgHR} BPM (Pic d'intensité: ${maxInt}G) avec un indice de stabilité global de ${avgStability}%. Rapport généré avec succès.`;
        document.getElementById('reportSummaryText').textContent = summary;
    }

    function updateHistoryUI() {
        elements.historyArea.style.display = 'block';
        elements.historyList.innerHTML = '';
        
        sessionHistory.forEach((session, index) => {
            const avgHR = Math.round(session.heartRates.reduce((a,b) => a+b, 0) / session.heartRates.length) || 0;
            const avgStab = Math.round(session.stabilityScores.reduce((a,b) => a+b, 0) / session.stabilityScores.length) || 0;
            
            const el = document.createElement('div');
            el.className = 'history-item';
            el.innerHTML = `
                <div class="history-details">
                    <div class="history-stat">
                        <span>Patient</span>
                        <strong>#${session.patientId}</strong>
                    </div>
                    <div class="history-stat">
                        <span>Activité</span>
                        <strong>${session.activityName}</strong>
                    </div>
                    <div class="history-stat">
                        <span>Durée</span>
                        <strong>${session.duration}s</strong>
                    </div>
                    <div class="history-stat">
                        <span>Rythme Moyen</span>
                        <strong>${avgHR} BPM</strong>
                    </div>
                    <div class="history-stat">
                        <span>Stabilité</span>
                        <strong>${avgStab}%</strong>
                    </div>
                </div>
                <button class="btn btn-outline export-history-btn" data-id="${session.id}">
                    <i data-lucide="download"></i> CSV
                </button>
            `;
            elements.historyList.appendChild(el);
        });
        
        lucide.createIcons({ root: elements.historyList });
        
        // Bind export buttons
        document.querySelectorAll('.export-history-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const session = sessionHistory.find(s => s.id === id);
                if (session) exportSessionToCSV(session);
            });
        });
    }

    async function exportSessionToCSV(session) {
        if (!session || session.rawSamples.length === 0) {
            showToast("Aucune donnée à exporter.", "x-circle");
            return;
        }

        // CSV Header
        let csvContent = "Time(s),Timestamp,PatientID,Activity,Acc_X(g),Acc_Y(g),Acc_Z(g),Gyro_X(deg/s),Gyro_Y(deg/s),Gyro_Z(deg/s),HeartRate(BPM),Intensity(G)\n";
        
        // CSV Rows
        session.rawSamples.forEach(sample => {
            const row = [
                sample.time,
                sample.timeStr,
                session.patientId,
                session.activityName,
                sample.acc[0].toFixed(4),
                sample.acc[1].toFixed(4),
                sample.acc[2].toFixed(4),
                sample.gyro[0].toFixed(4),
                sample.gyro[1].toFixed(4),
                sample.gyro[2].toFixed(4),
                Math.round(sample.hr),
                sample.intensity.toFixed(4)
            ].join(",");
            csvContent += row + "\n";
        });

        // Add BOM for Excel UTF-8 compatibility
        const bom = "\uFEFF";
        const finalContent = bom + csvContent;
        
        // Logical name including activity
        const safeActivityName = session.activityName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const defaultFilename = `Analyse_Patient_${session.patientId}_${safeActivityName}_${new Date(session.id).toISOString().split('T')[0]}.csv`;

        try {
            if (window.showSaveFilePicker) {
                // API native pour choisir le dossier de destination
                const handle = await window.showSaveFilePicker({
                    suggestedName: defaultFilename,
                    types: [{
                        description: 'Fichier CSV (.csv)',
                        accept: {'text/csv': ['.csv']},
                    }],
                });
                const writable = await handle.createWritable();
                await writable.write(finalContent);
                await writable.close();
                showToast("Fichier CSV enregistré !", "download-cloud");
            } else {
                // Fallback classique
                const blob = new Blob([finalContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href", url);
                downloadAnchorNode.setAttribute("download", defaultFilename);
                document.body.appendChild(downloadAnchorNode); 
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
                URL.revokeObjectURL(url);
                showToast("Fichier CSV exporté !", "download-cloud");
            }
        } catch (err) {
            // L'utilisateur a annulé la boîte de dialogue ou erreur
            if (err.name !== 'AbortError') {
                console.error("Erreur de sauvegarde:", err);
                showToast("Erreur lors de la sauvegarde.", "x-circle");
            }
        }
    }

    // Events
    elements.startBtn.addEventListener('click', startAnalysis);
    elements.stopBtn.addEventListener('click', stopAnalysis);
    
    // Main export button exports the most recent session
    if (elements.exportBtn) {
        elements.exportBtn.addEventListener('click', () => {
            if (sessionHistory.length > 0) {
                exportSessionToCSV(sessionHistory[0]);
            } else if (sessionData.rawSamples.length > 0) {
                exportSessionToCSV(sessionData); // fallback if somehow history wasn't saved yet
            } else {
                showToast("Aucune donnée à exporter.", "x-circle");
            }
        });
    }
    
    elements.refreshRange.addEventListener('input', (e) => {
        refreshRate = parseInt(e.target.value);
        elements.rateValue.textContent = refreshRate;
        if (isAnalyzing) {
            clearInterval(dataInterval);
            dataInterval = setInterval(collectData, refreshRate);
        }
    });
});
