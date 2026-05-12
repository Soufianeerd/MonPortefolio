from flask import Flask, render_template, request, jsonify, send_from_directory
from database import init_db, get_db_connection
import os

app = Flask(__name__)
app.secret_key = "airalert_premium_secret_key"

# Initialize Database
init_db()

# --- Page Routes ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/workouts')
def workouts():
    return render_template('workouts.html')

@app.route('/goals')
def goals():
    return render_template('goals.html')

@app.route('/progress')
def progress():
    return render_template('progress.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

# --- API Routes ---

@app.route('/api/dashboard')
def api_dashboard():
    # Session 4 will connect this to real DB data
    data = {
        "performance_score": 87,
        "vertical_jump": 62,
        "calories": 420,
        "training_time": 48,
        "streak": 12,
        "weekly_progress": [45, 52, 49, 58, 60, 62, 67],
        "badges": [
            {"id": 1, "name": "Série 7 jours", "icon": "fa-fire"},
            {"id": 2, "name": "Jump Boost", "icon": "fa-bolt"},
            {"id": 3, "name": "Discipline", "icon": "fa-check-circle"},
            {"id": 4, "name": "Endurance", "icon": "fa-running"}
        ],
        "daily_goals": [
            {"id": 1, "text": "100 squats", "completed": False},
            {"id": 2, "text": "50 pompes", "completed": False},
            {"id": 3, "text": "20 minutes cardio", "completed": False},
            {"id": 4, "text": "10 minutes mobilité", "completed": False}
        ]
    }
    return jsonify(data)

@app.route('/api/workouts', methods=['GET'])
def get_workouts():
    conn = get_db_connection()
    workouts = conn.execute('SELECT * FROM workouts ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in workouts])

@app.route('/api/workouts', methods=['POST'])
def add_workout():
    data = request.json
    conn = get_db_connection()
    conn.execute('''
        INSERT INTO workouts (workout_type, duration, calories, vertical_jump, reps, notes)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        data['workout_type'],
        data['duration'],
        data['calories'],
        data['vertical_jump'],
        data['reps'],
        data['notes']
    ))
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "message": "Entraînement enregistré !"}), 201

@app.route('/api/workouts/<int:id>', methods=['DELETE'])
def delete_workout(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM workouts WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "message": "Entraînement supprimé !"})

# --- API Goals ---

@app.route('/api/goals', methods=['GET'])
def get_goals():
    conn = get_db_connection()
    goals = conn.execute('SELECT * FROM goals ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in goals])

@app.route('/api/goals', methods=['POST'])
def add_goal():
    data = request.json
    conn = get_db_connection()
    conn.execute('''
        INSERT INTO goals (title, target_value, current_value, unit, status)
        VALUES (?, ?, ?, ?, ?)
    ''', (data['title'], data['target_value'], data.get('current_value', 0), data['unit'], 'actif'))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"}), 201

@app.route('/api/goals/<int:id>', methods=['PATCH'])
def update_goal(id):
    data = request.json
    conn = get_db_connection()
    if 'current_value' in data:
        conn.execute('UPDATE goals SET current_value = ? WHERE id = ?', (data['current_value'], id))
    if 'status' in data:
        conn.execute('UPDATE goals SET status = ? WHERE id = ?', (data['status'], id))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route('/api/goals/<int:id>', methods=['DELETE'])
def delete_goal(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM goals WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

# --- API Badges & Analytics ---

@app.route('/api/badges', methods=['GET'])
def get_badges():
    conn = get_db_connection()
    # Logic to auto-unlock badges
    workouts = conn.execute('SELECT COUNT(*) as count, MAX(vertical_jump) as max_jump FROM workouts').fetchone()
    count = workouts['count']
    max_jump = workouts['max_jump'] or 0

    badge_rules = [
        {"name": "First Workout", "desc": "1 entraînement terminé", "req": count >= 1},
        {"name": "Streak Starter", "desc": "3 entraînements terminés", "req": count >= 3},
        {"name": "Jump Beast", "desc": "Détente >= 60 cm", "req": max_jump >= 60},
        {"name": "Discipline", "desc": "5 entraînements terminés", "req": count >= 5},
        {"name": "Machine", "desc": "10 entraînements terminés", "req": count >= 10}
    ]

    for rule in badge_rules:
        existing = conn.execute('SELECT * FROM badges WHERE name = ?', (rule['name'],)).fetchone()
        if not existing:
            conn.execute('INSERT INTO badges (name, description, unlocked) VALUES (?, ?, ?)', 
                         (rule['name'], rule['desc'], 1 if rule['req'] else 0))
        elif rule['req'] and existing['unlocked'] == 0:
            conn.execute('UPDATE badges SET unlocked = 1 WHERE name = ?', (rule['name'],))
    
    conn.commit()
    badges = conn.execute('SELECT * FROM badges').fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in badges])

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db_connection()
    stats = conn.execute('''
        SELECT 
            COUNT(*) as total_workouts,
            SUM(duration) as total_duration,
            SUM(calories) as total_calories,
            MAX(vertical_jump) as max_jump,
            AVG(duration) as avg_duration
        FROM workouts
    ''').fetchone()
    
    recent = conn.execute('SELECT * FROM workouts ORDER BY created_at DESC LIMIT 5').fetchall()
    conn.close()
    
    return jsonify({
        "summary": dict(stats),
        "recent": [dict(ix) for ix in recent]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)

# --- PWA Support ---

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')

@app.route('/service-worker.js')
def service_worker():
    return send_from_directory('static', 'service-worker.js')
