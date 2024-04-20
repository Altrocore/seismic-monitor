from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from emsc_services.seismic_events import get_seismic_events
from emsc_services.felt_reports import get_felt_reports
from usgs_services.volcano_reports import get_volcano_reports

app = Flask(__name__)
CORS(app)

@app.route('/')
@cross_origin()
def home():
    return "Welcome to the Seismic Activity Monitor API"

@app.route('/seismic-events')
@cross_origin()
def seismic_events():
    data = get_seismic_events()
    return jsonify(data)

@app.route('/felt-reports')
@cross_origin()
def felt_reports():
    data, status_code = get_felt_reports()
    if status_code != 200:
        # If there was an error, return the error data with the status code
        return jsonify(data), status_code
    return jsonify(data)  # If all is well, return the data

@app.route('/volcano-reports')
@cross_origin()
def volcano_reports():
    data = get_volcano_reports()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)

