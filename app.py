from flask import Flask, render_template, url_for, redirect, request, session, flash
from flask_sqlalchemy import  SQLAlchemy
from flask_bcrypt import Bcrypt, generate_password_hash


app = Flask(__name__)
app.config['SECRET_KEY'] = 'MYKEY'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users_db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    First_Name = db.Column(db.String(30), nullable=False)
    Last_Name = db.Column(db.String(40), nullable=False)
    Email = db.Column(db.String(40), nullable=False,primary_key= True)
    Password = db.Column(db.String(40), nullable=False)

    def __str__(self):
        return f'User First Name:{self.First_Name}; Last Name: {self.Last_Name}; Email: {self.Email}'


db.create_all()


@app.route('/home')
@app.route('/')
def home():
    return  render_template('base.html')


@app.route('/categories')
def categories():
    return  render_template('categories.html')
    
@app.route('/books')
def books():
    return  render_template('books.html')


@app.route('/savedBooks')
def savedBooks():
    return  render_template('mybooks.html')

@app.route('/login', methods= ['GET','POST'])
def login():
    if 'user' not in session:
        try:
            if request.method == 'POST' and User.query.filter_by(Email=request.form['email']).first().Email == request.form['email']:
                hashed = User.query.filter_by(Email=request.form['email']).first().Password
                email = User.query.filter_by(Email=request.form['email']).first().Email
                passw_ = request.form['password']
                print(bcrypt.check_password_hash(hashed, passw_))
                if bcrypt.check_password_hash(hashed, passw_):
                    userr = request.form['email']
                    session['user'] = userr
                    return redirect(url_for('home'))
                if not bcrypt.check_password_hash(hashed, passw_):
                    flash('Password is incorrect!', 'not')

        except AttributeError:
            flash('You are not registered', 'not')

        return render_template('login.html',title='Login')
    return redirect(url_for('home',title='Home'))


@app.route('/logout')
def logout():
    session.pop('user',None)
    return redirect(url_for('home'))


@app.route('/registration', methods= ['GET','POST'])
def registration():
    try:
        if request.method == 'POST' and User.query.filter_by(Email=request.form['email']).first().Email == request.form['email']:
            flash ('You are already registered', 'not')
    except AttributeError:
        global pas
        if request.method == 'POST':
            firstname = request.form['firstname']
            lastname = request.form['lastname']
            email = request.form['email']
            psw = request.form['psw']
            hashed_psw = bcrypt.generate_password_hash(psw).decode('utf-8')
            pas = hashed_psw
            user = User(First_Name=firstname, Last_Name=lastname, Email= email,Password=hashed_psw )
            db.session.add(user)
            db.session.commit()
            userr = request.form['email']
            session['user'] = userr
            return redirect(url_for('home'))

    return render_template('registration.html', title='Register')

if __name__ == '__main__':
    app.run(debug=True)