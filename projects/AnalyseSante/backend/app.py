from flask import Flask, jsonify, render_template, request
import subprocess
import threading

app = Flask(__name__)

# Lancement de deux daemons C++ (un par patient)
daemon1 = subprocess.Popen(
    ["./daemon/daemon", "1", "1"],
    stdout=subprocess.PIPE,
    text=True,
    bufsize=1
)

daemon2 = subprocess.Popen(
    ["./daemon/daemon", "2", "1"],
    stdout=subprocess.PIPE,
    text=True,
    bufsize=1
)

latest_data_1 = {}
latest_data_2 = {}

def read_daemon1():
    global latest_data_1

    for line in daemon1.stdout:
        row = line.strip().split(",")

        if len(row) < 15:
            continue

        latest_data_1 = {
            "alx": float(row[1]),
            "aly": float(row[2]),
            "alz": float(row[3]),
            "glx": float(row[4]),
            "gly": float(row[5]),
            "glz": float(row[6]),
            "arx": float(row[7]),
            "ary": float(row[8]),
            "arz": float(row[9]),
            "grx": float(row[10]),
            "gry": float(row[11]),
            "grz": float(row[12]),
            "activity": row[13],
            "subject": row[14]
        }

def read_daemon2():
    global latest_data_2

    for line in daemon2.stdout:
        row = line.strip().split(",")

        if len(row) < 15:
            continue

        latest_data_2 = {
            "alx": float(row[1]),
            "aly": float(row[2]),
            "alz": float(row[3]),
            "glx": float(row[4]),
            "gly": float(row[5]),
            "glz": float(row[6]),
            "arx": float(row[7]),
            "ary": float(row[8]),
            "arz": float(row[9]),
            "grx": float(row[10]),
            "gry": float(row[11]),
            "grz": float(row[12]),
            "activity": row[13],
            "subject": row[14]
        }

threading.Thread(target=read_daemon1, daemon=True).start()
threading.Thread(target=read_daemon2, daemon=True).start()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def data():
    subject = request.args.get("subject", type=int)

    if subject == 1:
        return jsonify(latest_data_1)
    else:
        return jsonify(latest_data_2)

if __name__ == "__main__":
    app.run(debug=True)