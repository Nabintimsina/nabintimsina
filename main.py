from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email
import ssl,smtplib
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.


class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired('Please enter your Name.')])
    email = EmailField('Email', validators=[DataRequired('Please enter your email address.'), Email('Invalid email address')])
    message = TextAreaField('Message',  validators=[DataRequired('This field is required.')])
    submit = SubmitField("Send")
app = Flask(__name__)
app.secret_key  = os.getenv('SECRET_KEY')

def send_message_to_email(name, email, message):
    sender = os.getenv('SENDER')
    password = os.getenv('PASSWORD')
    receiver = os.getenv('RECEIVER')
    body_msg = f'''Subject:New Message from website\n\nName: {name}\nEmail: {email}\nmessage: {message}'''

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as connection:
        connection.login(sender, password)
        connection.sendmail(sender,receiver,body_msg)


@app.route("/", methods=['POST', "GET"])
def index():
    contact_form= ContactForm()
    if request.method == 'POST':
        if contact_form.validate_on_submit():
            name= contact_form.name.data
            email= contact_form.email.data
            message= contact_form.message.data

            send_message_to_email(name= name, email= email, message= message)

            return render_template('index.html', is_sucess=True, form= contact_form)

    return render_template('index.html', form= contact_form)


if __name__ == '__main__':
    app.run( host='0.0.0.0', port=8080)    