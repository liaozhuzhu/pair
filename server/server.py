from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid 
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=["GET",
     "POST", "OPTIONS"], allow_headers=["Content-Type"])

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
    handle text based file uploads, these would go to object storage and would not be stored in the database
    """
    pass

@app.route('/pairapi/create-agent', methods=['POST'])
def create_agent():
    session_name = request.form.get("sessionName")
    type_of_interview = request.form.get("typeOfInterview")
    context = request.form.get("context")
    files = request.files.getlist("files") 

    file_info = [{"filename": file.filename,
                  "content_type": file.content_type} for file in files]
    print(f"session_name: {session_name}, type_of_interview: {type_of_interview}, context: {context}, files: {file_info}")

    session_id = str(uuid.uuid4())
    return jsonify({"sessionId": session_id})
    

if __name__ == "__main__": # so this file is not importable in other modules
    app.run()
