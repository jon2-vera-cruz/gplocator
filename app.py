import os
import bond
import json
import requests
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for, g)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from geojson import (Point, Feature)
from werkzeug.security import generate_password_hash, check_password_hash

if os.path.exists("env.py"):
    import env

app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)
js = bond.make_bond('JavaScript')


def clinic_locations_details(clinics):
    clinic_details = []
    for clinic in clinics:
        point = Point([float(clinic['longtitude']), float(clinic['latitude'])])
        properties = {
            'title': clinic['clinic_name'],
            'icon': 'campsite',
            'marker-color': '#3bb2d0',
            'marker-symbol': 1
        }

        # properties = {
        #     "clinic_name": clinic['clinic_name'],
        #     "address": " ".join(["{0},{1},{2},{3},{4},{5}".format(
        #         clinic["address_1"], clinic["address_2"], 
        #         clinic["locality"], clinic["town_district"], 
        #         clinic["county"], clinic["postcode"])]),
        #     "phone_number": clinic['main_phone'],
        #     "website": clinic['website']
        # }
        feature = Feature(geometry=point, properties=properties)
        clinic_details.append(feature)
    return clinic_details


@app.route("/")
@app.route("/get_clinics")
def get_clinics():
    clinics = list(mongo.db.clinics.find())
    # clinics_json = []
    # for clinic in clinics:
    #     clinic.pop('_id')
    #     converttojson = json.dumps(clinic)
    #     clinics_json.append(converttojson)
        # converttodict = str(clinic).replace("'", '"')
        # clinics_json.append(json.loads(converttodict))
    # clinic_locations = clinic_locations_details(clinics)
    return render_template("clinics.html", clinics=clinics)
    # return render_template("clinics.html", clinics=clinics_json)
    # return render_template("clinics.html", clinics=clinics, clinic_locations=json.dumps(clinic_locations))


@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.form.get("query")
    clinics = list(mongo.db.clinics.find({"$text": {"$search": query}}))
    # clinic_locations = clinic_locations_details(clinics)
    return render_template("clinics.html", clinics=clinics)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)