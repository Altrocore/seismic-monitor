import requests

def get_volcano_reports():
    url = "https://volcanoes.usgs.gov/hans2/apiv2/volcanoApi/allWithNotice"
    response = requests.get(url)
    return response.json()
