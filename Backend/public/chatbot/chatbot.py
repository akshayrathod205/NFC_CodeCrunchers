from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Set up OpenAI API credentials
openai.api_key = ''

# Define some general questions
general_questions = [
    "Tell me about yourself.",
    "What is your favorite book?",
    "What is the capital of France?",
    "What are the benefits of exercise?",
]

@app.route("/")
def index():
    return render_template("chatbot.html", general_questions=general_questions)

@app.route("/api", methods=["POST"])
def api():
    message = request.json.get("message")
    
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ]
    )
    
    response = completion.choices[0].message['content'] if completion.choices and completion.choices[0].message else 'Failed to Generate response!'
    
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)























# from flask import Flask, render_template, request
# import openai


# app = Flask(__name__)

# # Set up OpenAI API credentials
# # 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
# openai.api_key = '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'


# # Define the default route to return the index.html file
# @app.route("/")
# def index():
#     return render_template("index.html")

# # Define the /api route to handle POST requests
# @app.route("/api", methods=["POST"])
# def api():
#     # Get the message from the POST request
#     message = request.json.get("message")
#     # Send the message to OpenAI's API and receive the response
    
    
#     completion = openai.ChatCompletion.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "user", "content": message}
#     ]
#     )
#     if completion.choices[0].message!=None:
#         return completion.choices[0].message

#     else :
#         return 'Failed to Generate response!'
    

    
    

# if __name__=='__main__':
#     app.run()

