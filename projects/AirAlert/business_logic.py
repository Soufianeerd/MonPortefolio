import datetime
from typing import List, Dict

class AirAlertIntelligence:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.baseline_jump = 0.0 # Détente initiale en cm
        self.performance_history = []
    
    def log_performance(self, date_str: str, vertical_jump: float, workout_duration_min: int, felt_fatigue: int):
        """
        Enregistre une séance et calcule l'évolution.
        """
        if not self.performance_history:
            self.baseline_jump = vertical_jump
            
        entry = {
            "date": datetime.datetime.strptime(date_str, "%Y-%m-%d"),
            "jump": vertical_jump,
            "duration": workout_duration_min,
            "fatigue_score": felt_fatigue, # 1 à 10
            "improvement": vertical_jump - self.baseline_jump
        }
        self.performance_history.append(entry)
        return self._analyze_trend()

    def _analyze_trend(self) -> Dict:
        """
        Analyse les statistiques pour générer des alertes intelligentes.
        """
        if len(self.performance_history) < 3:
            return {"status": "collecting_data", "message": "Continuez pour débloquer vos statistiques."}
            
        recent_fatigue = sum([x["fatigue_score"] for x in self.performance_history[-3:]]) / 3
        
        # Logique de notification de récupération
        if recent_fatigue > 8.0:
            return {
                "action": "trigger_notification",
                "type": "recovery_alert",
                "message": "Vos récents entraînements ont été intenses. Prenez une journée de récupération active ou de stretching pour maximiser vos gains."
            }
            
        return {
            "status": "optimal",
            "message": "Progression constante détectée. Vous êtes sur la bonne voie pour battre votre record personnel !"
        }

    def predict_goal_completion(self, target_jump_cm: float) -> str:
        """
        Prédiction mathématique simple de l'atteinte de l'objectif (Version Premium IA).
        """
        if len(self.performance_history) < 2:
            return "Pas assez de données pour une prédiction."
            
        first = self.performance_history[0]
        last = self.performance_history[-1]
        
        days_passed = (last["date"] - first["date"]).days
        if days_passed == 0 or last["improvement"] <= 0:
            return "Maintenez vos efforts, la progression va s'accélérer."
            
        rate_per_day = last["improvement"] / days_passed
        cm_remaining = target_jump_cm - last["jump"]
        
        if cm_remaining <= 0:
            return "Objectif déjà atteint ! Définissez un nouveau palier."
            
        days_needed = int(cm_remaining / rate_per_day)
        estimated_date = last["date"] + datetime.timedelta(days=days_needed)
        
        return f"À ce rythme, vous atteindrez {target_jump_cm}cm d'ici le {estimated_date.strftime('%d/%m/%Y')}."

# Exemple d'utilisation
user_tracker = AirAlertIntelligence(user_id="athlète_001")
user_tracker.log_performance("2026-05-01", 55.0, 45, 6)
user_tracker.log_performance("2026-05-04", 56.5, 50, 7)
insight = user_tracker.log_performance("2026-05-06", 57.0, 60, 9)

print(insight)
print(user_tracker.predict_goal_completion(65.0))