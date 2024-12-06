from flask import Flask

app = Flask(__name__)

@app.route("/pairapi")
def api():
    """
    main default route
    """
    return "Hello from pAIr"


@app.route("/pairapi/chat", methods=['POST'])
def chat():
    """
    Takes in user query and returns text response
    """
    pass

@app.route('/pairapi/upload', methods=['POST'])
def upload():
    """
    handle text based file uploads
    """
    pass

if __name__ == "__main__": # so this file is not importable in other modules
    app.run()
