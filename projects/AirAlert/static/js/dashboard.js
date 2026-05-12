document.addEventListener('DOMContentLoaded', () => {
    // 1. Date du jour
    const dateEl = document.getElementById('current-date');
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    dateEl.innerText = now.toLocaleDateString('fr-FR', options);

    // 2. Initialisation des données par défaut
    let dashboardData = {
        performance_score: 87,
        vertical_jump: 62,
        calories: 420,
        training_time: 48,
        streak: 12,
        weekly_progress: [45, 52, 49, 58, 60, 62, 67],
        badges: [
            {id: 1, name: "Série 7 jours", icon: "fa-fire"},
            {id: 2, name: "Jump Boost", icon: "fa-bolt"},
            {id: 3, name: "Discipline", icon: "fa-check-circle"},
            {id: 4, name: "Endurance", icon: "fa-running"}
        ],
        daily_goals: [
            {id: 1, text: "100 squats"},
            {id: 2, text: "50 pompes"},
            {id: 3, text: "20 minutes cardio"},
            {id: 4, text: "10 minutes mobilité"}
        ]
    };

    // 3. Fetch data from API
    Promise.all([
        fetch('/api/dashboard').then(res => res.json()),
        fetch('/api/badges').then(res => res.json()),
        fetch('/api/stats').then(res => res.json())
    ])
    .then(([dashData, badgesData, statsData]) => {
        dashboardData = {
            ...dashData,
            badges: badgesData.filter(b => b.unlocked === 1),
            performance_score: statsData.summary.total_workouts * 5 + (statsData.summary.max_jump || 0) // Example logic
        };
        // Normalize performance score
        if (dashboardData.performance_score > 100) dashboardData.performance_score = 100;
        
        // Sync stats from real stats API
        dashboardData.vertical_jump = statsData.summary.max_jump || 0;
        dashboardData.calories = statsData.summary.total_calories || 0;
        dashboardData.training_time = statsData.summary.total_duration || 0;
        dashboardData.streak = statsData.summary.total_workouts; // Simplified
        
        renderDashboard();
    })
    .catch(err => {
        console.log("Utilisation des données locales (API hors ligne)");
        renderDashboard();
    });

    function renderDashboard() {
        // Stats
        document.getElementById('perf-score').innerText = dashboardData.performance_score;
        document.getElementById('stat-jump').innerText = dashboardData.vertical_jump + " cm";
        document.getElementById('stat-time').innerText = dashboardData.training_time + " min";
        document.getElementById('stat-cal').innerText = dashboardData.calories + " kcal";
        document.getElementById('stat-streak').innerText = dashboardData.streak + " j";

        // Progress Ring
        const ring = document.getElementById('perf-ring');
        const radius = ring.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (dashboardData.performance_score / 100) * circumference;
        ring.style.strokeDashoffset = offset;

        // Chart
        drawChart(dashboardData.weekly_progress);

        // Goals
        renderGoals(dashboardData.daily_goals);

        // Badges
        renderBadges(dashboardData.badges);
    }

    function drawChart(data) {
        const canvas = document.getElementById('progressChart');
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;

        const padding = 30;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        const maxVal = Math.max(...data) + 10;
        const stepX = chartWidth / (data.length - 1);

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

        // Draw Line
        ctx.beginPath();
        ctx.strokeStyle = '#2563EB';
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        data.forEach((val, i) => {
            const x = padding + i * stepX;
            const y = canvas.height - padding - (val / maxVal) * chartHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Fill Area
        ctx.lineTo(padding + (data.length - 1) * stepX, canvas.height - padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Points
        data.forEach((val, i) => {
            const x = padding + i * stepX;
            const y = canvas.height - padding - (val / maxVal) * chartHeight;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#2563EB';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Days Label
        const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        ctx.fillStyle = '#9CA3AF';
        ctx.font = 'bold 10px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        days.forEach((day, i) => {
            ctx.fillText(day, padding + i * stepX, canvas.height - 5);
        });
    }

    function renderGoals(goals) {
        const list = document.getElementById('goals-list');
        list.innerHTML = '';
        
        // Load completion state from localStorage
        const savedState = JSON.parse(localStorage.getItem('airalert_goals') || '{}');

        goals.forEach(goal => {
            const isCompleted = savedState[goal.id] || false;
            const item = document.createElement('div');
            item.className = `goal-item ${isCompleted ? 'completed' : ''}`;
            item.innerHTML = `
                <div class="goal-check"></div>
                <span>${goal.text}</span>
            `;
            item.onclick = () => {
                const newState = !item.classList.contains('completed');
                item.classList.toggle('completed', newState);
                savedState[goal.id] = newState;
                localStorage.setItem('airalert_goals', JSON.stringify(savedState));
            };
            list.appendChild(item);
        });
    }

    function renderBadges(badges) {
        const grid = document.getElementById('badges-grid');
        grid.innerHTML = '';
        badges.forEach(badge => {
            const item = document.createElement('div');
            item.className = 'badge-item';
            item.innerHTML = `
                <i class="fas ${badge.icon}"></i>
                <p>${badge.name}</p>
            `;
            grid.appendChild(item);
        });
    }
});
