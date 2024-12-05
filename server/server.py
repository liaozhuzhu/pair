from flask import Flask

app = Flask(__name__)

@app.route("/")
def api():
    return "Hello from pAIr"

if __name__ == "__main__": # so this file is not importable in other modules
    app.run()
