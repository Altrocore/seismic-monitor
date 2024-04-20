import requests
from flask import jsonify

def get_felt_reports():
    url = "https://www.seismicportal.eu/testimonies-ws/api/search?&format=json&downloadAsFile=false&orderby=time-desc&offset=0&limit=10"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return(response.json(), response.status_code)
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None, 500
