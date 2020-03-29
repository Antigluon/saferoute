from flask import Flask, render_template, request, redirect, Response, jsonify
import requests
import json
from datetime import datetime
import pyrebase
import urllib.parse
import base64
from twilio.rest import Client
from math import sin, cos, sqrt, atan2, radians

app = Flask(__name__)
key = 'QwD7l7Q2gwYrsOuErXCMPpt3BBfZGVGv' # mapquest api key
googleKey = 'AIzaSyAfb_Qec8vmznbzmYrCwhxKzIcF043EHxs'
config = { # firebase api credentials
    "apiKey": googleKey,
    "authDomain": "hoohacks-saferoute.firebaseapp.com",
    "databaseURL": "https://hoohacks-saferoute.firebaseio.com",
    "storageBucket": "",
    "serviceAccount": "saferoute-12d4ae7bb3.json"
}
auth_token = '46845931bc94cb02a8117deb91fb0fe4'
account_sid = 'AC39c47793f48670e8eac44ac985b7e9a9'
client = Client(account_sid, auth_token)

def dbinit():
    firebase = pyrebase.initialize_app(config)
    db = firebase.database()
    return db

def texter(phone, msg):
    message = client.messages.create(
        body="{}".format(str(msg)),
        from_='+12028002340',
        to='{}'.format(str(phone)))

def getDirections(lat, long, destination, transit): # returns directions from point a to point b by specific method of transportation avoiding danger zones
    url = "http://www.mapquestapi.com/directions/v2/route?key={}".format(key)
    lati, longi, weight, radius = [], [], [], []
    db = dbinit()
    dic = db.child('high').get().val()
    for child in dic.items():
        lati.append(decode(child[0]).split(',')[0])
        longi.append(decode(child[0]).split(',')[1])
        weight.append(100)
        radius.append(0.2)
    dic = db.child('medium').get().val()
    for child in dic.items():
        lati.append(decode(child[0]).split(',')[0])
        longi.append(decode(child[0]).split(',')[1])
        weight.append(100)
        radius.append(0.1)
    jsonlist = [{"lat": latitude, "lng": longitude, "weight": pounds, "radius": dist} for latitude, longitude, pounds, dist in zip(lati, longi, weight, radius)]
    datajson = json.dumps(
        {
        "locations": [
            "{},{}".format(lat, long),
            "{}".format(locationToCoords(destination))
        ],
        "options": {
            "routeType": "{}".format(transit),
            "routeControlPointCollection": jsonlist
        }
    }
    )
    print(datajson)
    maps = requests.post(url, datajson)
    return maps.text

def encode(string):
    return base64.b64encode(string.encode('ascii'))

def decode(string):
    return base64.b64decode(string[2:-1]).decode()

def setDanger(lat, long, severity, transcript): # adds specific areas to live database of linkIDs under severity classifications
    coords = encode("{},{},{}".format(lat, long, str(datetime.now())))
    db = dbinit()
    if severity == 2:
        db.child('high').child(coords).set(transcript)
    elif severity == 1:
        db.child('medium').child(coords).set(transcript)
    elif severity == 0:
        db.child('low').child(coords).set(transcript)

def locationToCoords(location): # turns a likely vague location string from the ML instance into exact coords
    query = urllib.parse.quote(location)
    url = "https://earth.google.com/earth/rpc/search?client=earth-client&cv=9.3.107.2&gl=US&hl=en&ie=utf-8&q={}".format(query)
    response = requests.get(url)
    body = response.text
    try:
        coords = body.split('<lat_lng lat="')[1].split("\"/>")[0]
        lat = coords.split('"')[0]
        long = coords.split('lng="')[1]
        return "{},{}".format(lat, long)
    except IndexError:
        return False

def newRoute(shapecoords):
    R = 6373.0 # radius of earth in km
    db = dbinit()
    dic = db.child('high').get().val()
    for child in dic.items():
        lat1 = radians(float(decode(child[0]).split(',')[0]))
        lon1 = radians(float(decode(child[0]).split(',')[1].split(',')[0]))
        for i in range(len(shapecoords)):
            if (i%2 == 0):
                lat2 = radians(shapecoords[i])
                lon2 = radians(shapecoords[i+1])
                dlon = lon2 - lon1
                dlat = lat2 - lat1
                a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
                c = 2 * atan2(sqrt(a), sqrt(1 - a))
                distance = R * c
                if distance <= 0.2:
                    return True
    dic = db.child('medium').get().val()
    for child in dic.items():
        lat1 = radians(float(decode(child[0]).split(',')[0]))
        lon1 = radians(float(decode(child[0]).split(',')[1].split(',')[0]))
        for x in range(len(shapecoords)):
            if (x%2 == 0):
                lat2 = radians(shapecoords[x])
                lon2 = radians(shapecoords[x+1])
                dlon = lon2 - lon1
                dlat = lat2 - lat1
                a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
                c = 2 * atan2(sqrt(a), sqrt(1 - a))
                distance = R * c
                if distance <= 0.1:
                    return True
    return False

def routeDeviation(shapecoords, lat, long):
    R = 6373.0 # radius of earth in km
    lat1 = radians(float(lat))
    lon1 = radians(float(long))
    for i in range(len(shapecoords)):
        if (i%2 == 0):
            lat2 = radians(shapecoords[i])
            lon2 = radians(shapecoords[i+1])
            dlon = lon2 - lon1
            dlat = lat2 - lat1
            a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
            c = 2 * atan2(sqrt(a), sqrt(1 - a))
            distance = R * c
            if distance <= 0.1:
                return False
    return True


@app.route('/', methods=['POST']) # take json data via post and returns directions. must include a lat, long, destination, and mode_of_transit
def home():
    data = request.get_json()
    lat = data['lat']
    long = data['long']
    destination = data['destination']
    transit = data['mode_of_transit']
    if transit == "drive":
        transit = "fastest"
    elif transit == "bike":
        transit = "bicycle"
    elif transit == "walk":
        transit = "pedestrian"
    directions = json.dumps({"sessionId": json.loads(getDirections(lat, long, destination, transit))['route']['sessionId']})
    return Response(directions, mimetype='application/json')


@app.route('/danger', methods=['POST'])
def addDanger():
    data = request.get_json()
    severity = data['severity']
    location = data['location']
    transcription = data['transcription']
    location = locationToCoords(location)
    if location:
        lat = location.split(",")[0]
        long = location.split(",")[1]
        setDanger(lat, long, severity, transcription)
        return "thanks :)"
    else:
        return "unable to parse location data. throwing out datapoint"


@app.route('/complete', methods=['POST'])
def finsished():
    data = request.get_json()
    phone = data['phone']
    username = data['username']
    guardian = data['guardian']
    destination = data['destination']
    message = "{}, {} safely arrived at {} at {}".format(guardian, username, destination, str(datetime.now()))
    texter(phone, message)
    return 'phew safe at last'


@app.route('/update', methods=['POST'])
def checkin():
    data = request.get_json()
    sessionId = data['sessionId']
    phone = data['phone']
    username = data['username']
    guardian = data['guardian']
    destination = data['destination']
    lat = data['lat']
    long = data['long']
    transit = data['mode_of_transit']
    if transit == "drive":
        transit = "fastest"
    elif transit == "bike":
        transit = "bicycle"
    elif transit == "walk":
        transit = "pedestrian"
    url = "http://www.mapquestapi.com/directions/v2/routeshape?key={}&sessionId={}&fullShape=true".format(key, sessionId)
    response = requests.get(url)
    try:
        shapecoords = json.loads(response.text)['route']['shape']['shapePoints']
    except KeyError:
        return Response(json.dumps({"error": "sessionId is invalid"}), mimetype='application/json')
    if newRoute(shapecoords):
        sessionId = json.loads(getDirections(lat, long, destination, transit))['route']['sessionId']
    if routeDeviation(shapecoords, lat, long):
        getfriend = 'http://www.mapquestapi.com/geocoding/v1/reverse?key={}'.format(key)
        otherdata = json.dumps(
            {
                "location": {
                    "latLng": {
                    "lat": lat,
                    "lng": long
                    }
                },
                "includeNearestIntersection": True
                }
        )
        link = "https://www.google.com/maps/search/?api=1&query={},{}".format(lat, long)
        try:
            friendlyadd = json.loads(requests.post(getfriend, otherdata).text)['results'][0]['locations'][0]['street']
        except IndexError:
            friendlyadd = "{}, {}".format(lat, long)
        message = "{}, {} appears to have deviated from his route to {} at {}. Their last known location is {}\n{}".format(guardian, username, destination, str(datetime.now()), friendlyadd, link)
        texter(phone, message)
    latitude, longitude, tm, transcript, severity = [], [], [], [], []
    db = dbinit()
    dic = db.child('high').get().val()
    for child in dic.items():
        title = decode(child[0])
        latitude.append(title.split(',')[0])
        longitude.append(title.split(',')[1])
        tm.append(title.split(',')[2])
        transcript.append(child[1])
        severity.append(2)
    dic = db.child('medium').get().val()
    for child in dic.items():
        title = decode(child[0])
        latitude.append(title.split(',')[0])
        longitude.append(title.split(',')[1])
        tm.append(title.split(',')[2])
        transcript.append(child[1])
        severity.append(1)
    dic = db.child('low').get().val()
    for child in dic.items():
        title = decode(child[0])
        latitude.append(title.split(',')[0])
        longitude.append(title.split(',')[1])
        tm.append(title.split(',')[2])
        transcript.append(child[1])
        severity.append(0)
    jsonlist = [{"Lat": lat, "Long": long, "Time": time, "Severity": severeness, "Transcript": transcription} for lat, long, time, severeness, transcription in zip(latitude, longitude, tm, severity, transcript)]
    datalist = json.dumps({"sessionId": sessionId, "dangers": jsonlist})
    return Response(datalist, mimetype='application/json')


@app.errorhandler(500)
def server_error(e):
    return e


@app.errorhandler(404)
def page_not_found(e):
    return 'uh this is awkward but that page doesn\'t do the exist thing at the moment :('

# add more error handling maybe?

if __name__ == '__main__':
    app.run(debug=False)
