document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form');
    const toggleBtn = document.getElementById('toggle-form');
    const formWrapper = document.getElementById('workout-form-wrapper');
    const historyList = document.getElementById('history-list');
    const countEl = document.getElementById('workout-count');
    const toast = document.getElementById('toast');

    // 1. Toggle Form Visibility
    toggleBtn.addEventListener('click', () => {
        const isHidden = formWrapper.style.display === 'none';
        formWrapper.style.display = isHidden ? 'block' : 'none';
        toggleBtn.innerHTML = isHidden ? '<i class="fas fa-times"></i>' : '<i class="fas fa-plus"></i>';
    });

    // 2. Fetch Workouts
    const fetchWorkouts = async () => {
        try {
            const res = await fetch('/api/workouts');
            const data = await res.json();
            renderWorkouts(data);
        } catch (err) {
            console.error('Erreur lors de la récupération des entraînements:', err);
        }
    };

    // 3. Render Workouts
    const renderWorkouts = (workouts) => {
        countEl.innerText = `${workouts.length} séance${workouts.length > 1 ? 's' : ''}`;
        
        if (workouts.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-dumbbell"></i>
                    <p>Aucun entraînement enregistré.<br>Commencez dès aujourd'hui !</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = '';
        workouts.forEach(w => {
            const date = new Date(w.created_at).toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
            });

            const card = document.createElement('div');
            card.className = `workout-card ${w.workout_type}`;
            card.innerHTML = `
                <div class="delete-workout" onclick="deleteWorkout(${w.id})"><i class="fas fa-trash"></i></div>
                <div class="card-top">
                    <h4>${w.workout_type}</h4>
                    <span class="card-date">${date}</span>
                </div>
                <div class="card-metrics">
                    <div class="c-metric">
                        <span>${w.duration} min</span>
                        <label>Durée</label>
                    </div>
                    <div class="c-metric">
                        <span>${w.calories} kcal</span>
                        <label>Calories</label>
                    </div>
                    <div class="c-metric">
                        <span>${w.vertical_jump || '--'} cm</span>
                        <label>Détente</label>
                    </div>
                    <div class="c-metric">
                        <span>${w.reps || '--'}</span>
                        <label>Reps</label>
                    </div>
                </div>
                ${w.notes ? `<div class="card-notes">${w.notes}</div>` : ''}
            `;
            historyList.appendChild(card);
        });
    };

    // 4. Add Workout
    workoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            workout_type: document.getElementById('workout_type').value,
            duration: parseInt(document.getElementById('duration').value),
            calories: parseInt(document.getElementById('calories').value),
            vertical_jump: parseInt(document.getElementById('vertical_jump').value) || 0,
            reps: parseInt(document.getElementById('reps').value) || 0,
            notes: document.getElementById('notes').value
        };

        try {
            const res = await fetch('/api/workouts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                showToast('Entraînement enregistré !');
                workoutForm.reset();
                formWrapper.style.display = 'none';
                toggleBtn.innerHTML = '<i class="fas fa-plus"></i>';
                fetchWorkouts();
            }
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement:', err);
        }
    });

    // 5. Global Delete Function (attached to window for ease with inline onclick)
    window.deleteWorkout = async (id) => {
        if (!confirm('Supprimer cet entraînement ?')) return;

        try {
            const res = await fetch(`/api/workouts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Entraînement supprimé');
                fetchWorkouts();
            }
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
        }
    };

    // 6. Toast UI
    const showToast = (msg) => {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

    // Initial load
    fetchWorkouts();
});
