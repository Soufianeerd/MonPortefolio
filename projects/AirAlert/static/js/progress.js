document.addEventListener('DOMContentLoaded', () => {
    
    const fetchStats = async () => {
        try {
            const res = await fetch('/api/stats');
            const data = await res.json();
            renderStats(data);
            
            // For charts, we need multiple data points
            // Since our DB might be new, we'll use recent history
            const allWorkoutsRes = await fetch('/api/workouts');
            const allWorkouts = await allWorkoutsRes.json();
            renderCharts(allWorkouts);
            generateInsights(allWorkouts);
        } catch (err) {
            console.error('Erreur stats:', err);
        }
    };

    const renderStats = (data) => {
        const s = data.summary;
        document.getElementById('total-workouts').innerText = s.total_workouts || 0;
        document.getElementById('record-jump').innerText = (s.max_jump || 0) + ' cm';
        document.getElementById('total-cals').innerText = s.total_calories || 0;
        document.getElementById('avg-time').innerText = Math.round(s.avg_duration || 0) + ' min';

        // Timeline
        const list = document.getElementById('timeline-list');
        list.innerHTML = '';
        data.recent.forEach(w => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            const date = new Date(w.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
            item.innerHTML = `
                <div class="timeline-icon" style="background: rgba(37, 99, 235, 0.1); color: var(--primary-blue);">
                    <i class="fas fa-running"></i>
                </div>
                <div class="timeline-info">
                    <h5>${w.workout_type}</h5>
                    <p>${date} • ${w.duration} min • ${w.calories} kcal</p>
                </div>
            `;
            list.appendChild(item);
        });
    };

    const generateInsights = (workouts) => {
        const insightText = document.getElementById('insight-text');
        if (workouts.length < 3) {
            insightText.innerText = "Continuez vos efforts ! Plus de données permettront des analyses plus fines.";
            return;
        }

        const last3 = workouts.slice(0, 3);
        const avgJump = last3.reduce((acc, w) => acc + (w.vertical_jump || 0), 0) / 3;
        
        if (avgJump > 50) {
            insightText.innerText = "Ta détente progresse régulièrement. Ton explosivité est en hausse !";
        } else if (workouts.length > 5) {
            insightText.innerText = "Ton volume d’entraînement augmente. Tu es plus régulier cette semaine.";
        } else {
            insightText.innerText = "Excellent début ! Garde ce rythme pour débloquer de nouveaux badges.";
        }
    };

    const renderCharts = (workouts) => {
        // Reverse for chronological order
        const data = [...workouts].reverse();
        
        drawChart('jumpChart', data.map(w => w.vertical_jump || 0), '#2563EB');
        drawChart('timeChart', data.map(w => w.duration || 0), '#F59E66');
        drawChart('calChart', data.map(w => w.calories || 0), '#ef4444');
    };

    const drawChart = (id, points, color) => {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;

        if (points.length < 2) {
            ctx.fillStyle = '#9CA3AF';
            ctx.textAlign = 'center';
            ctx.fillText('Pas assez de données', canvas.width/2, canvas.height/2);
            return;
        }

        const padding = 20;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        const maxVal = Math.max(...points) * 1.2 || 10;
        const stepX = chartWidth / (points.length - 1);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        points.forEach((val, i) => {
            const x = padding + i * stepX;
            const y = canvas.height - padding - (val / maxVal) * chartHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Fill
        ctx.lineTo(padding + (points.length - 1) * stepX, canvas.height - padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.fillStyle = color + '15'; // 15% opacity
        ctx.fill();
    };

    fetchStats();
});
