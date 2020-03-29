import requests
import urllib.parse

query = urllib.parse.quote("corner of west 59 and south pamell")
url = "https://earth.google.com/earth/rpc/search?client=earth-client&cv=9.3.107.2&gl=US&hl=en&ie=utf-8&q={}".format(query)
response = requests.get(url)
body = response.text
try:
    coords = body.split('<lat_lng lat="')[1].split("\"/>")[0]
    lat = coords.split('"')[0]
    long = coords.split('lng="')[1]
    print(lat)
    print(long)
except IndexError:
    print('Location not found')