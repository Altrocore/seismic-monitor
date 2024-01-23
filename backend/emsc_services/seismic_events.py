import requests

def get_seismic_events():
    url = "https://www.fdsn.org/ws/datacenters/1/query" 
    response = requests.get(url)
    return response.json()
