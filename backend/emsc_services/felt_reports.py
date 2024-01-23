import requests
from flask import jsonify

def get_felt_reports():
    url = "https://www.seismicportal.eu/testimonies-ws/api/search?&format=json&downloadAsFile=false&orderby=time-desc&offset=0&limit=10"
    response = requests.get(url)
    return response.json()
