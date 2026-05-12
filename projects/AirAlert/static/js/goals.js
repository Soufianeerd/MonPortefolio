document.addEventListener('DOMContentLoaded', () => {
    const goalForm = document.getElementById('goal-form');
    const toggleBtn = document.getElementById('toggle-goal-form');
    const formWrapper = document.getElementById('goal-form-wrapper');
    const goalsContainer = document.getElementById('goals-container');
    const goalsCountEl = document.getElementById('goals-count');
    const toast = document.getElementById('toast');

    // 1. Toggle Form
    toggleBtn.addEventListener('click', () => {
        const isHidden = formWrapper.style.display === 'none';
        formWrapper.style.display = isHidden ? 'block' : 'none';
        toggleBtn.innerHTML = isHidden ? '<i class="fas fa-times"></i>' : '<i class="fas fa-plus"></i>';
    });

    // 2. Fetch Goals
    const fetchGoals = async () => {
        const res = await fetch('/api/goals');
        const data = await res.json();
        renderGoals(data);
    };

    // 3. Render Goals
    const renderGoals = (goals) => {
        goalsCountEl.innerText = `${goals.length} objectif${goals.length > 1 ? 's' : ''}`;
        
        if (goals.length === 0) {
            goalsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bullseye"></i>
                    <p>Aucun objectif actif.<br>Fixez votre premier défi !</p>
                </div>
            `;
            return;
        }

        goalsContainer.innerHTML = '';
        goals.forEach(goal => {
            const progress = Math.min(100, Math.round((goal.current_value / goal.target_value) * 100));
            const card = document.createElement('div');
            card.className = 'goal-card';
            card.innerHTML = `
                <div class="goal-card-header">
                    <h4>${goal.title}</h4>
                    <span class="goal-badge ${goal.status}">${goal.status}</span>
                </div>
                <div class="goal-progress-wrapper">
                    <div class="goal-stats">
                        <span>${progress}%</span>
                        <span>${goal.current_value} / ${goal.target_value} ${goal.unit}</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                <div class="goal-actions">
                    <button class="btn btn-secondary btn-small" onclick="updateGoal(${goal.id}, ${goal.current_value + 1})">
                        <i class="fas fa-plus"></i> 1
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="updateGoalStatus(${goal.id}, 'terminé')">
                        Terminer
                    </button>
                    <button class="btn btn-secondary btn-small" style="color: #ef4444" onclick="deleteGoal(${goal.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            goalsContainer.appendChild(card);
        });
    };

    // 4. CRUD Operations
    goalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            title: document.getElementById('goal_title').value,
            target_value: parseInt(document.getElementById('goal_target').value),
            unit: document.getElementById('goal_unit').value
        };

        const res = await fetch('/api/goals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            showToast('Objectif créé !');
            goalForm.reset();
            formWrapper.style.display = 'none';
            toggleBtn.innerHTML = '<i class="fas fa-plus"></i>';
            fetchGoals();
        }
    });

    window.updateGoal = async (id, newValue) => {
        await fetch(`/api/goals/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ current_value: newValue })
        });
        fetchGoals();
    };

    window.updateGoalStatus = async (id, status) => {
        await fetch(`/api/goals/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status })
        });
        fetchGoals();
    };

    window.deleteGoal = async (id) => {
        if (confirm('Supprimer cet objectif ?')) {
            await fetch(`/api/goals/${id}`, { method: 'DELETE' });
            fetchGoals();
        }
    };

    const showToast = (msg) => {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    };

    fetchGoals();
});
