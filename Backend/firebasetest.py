import pyrebase
import base64

googleKey = 'AIzaSyAfb_Qec8vmznbzmYrCwhxKzIcF043EHxs'
config = { # firebase api credentials
    "apiKey": googleKey,
    "authDomain": "hoohacks-saferoute.firebaseapp.com",
    "databaseURL": "https://hoohacks-saferoute.firebaseio.com",
    "storageBucket": "",
    "serviceAccount": "saferoute-12d4ae7bb3.json"
}

def dbinit():
    firebase = pyrebase.initialize_app(config)
    db = firebase.database()
    return db

def encode(string):
    return base64.b64encode(string.encode('ascii'))

def decode(string):
    return base64.b64decode(string[2:-1]).decode()

db = dbinit()
dic = db.child('medium').get().val()
for child in dic.items():
    key = decode(child[0])
    print(key.split(',')[0])
    print(key.split(',')[1].split(',')[0])
    print(key.split(',')[2])
    print(child[1])
    print(2)