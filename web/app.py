#!/usr/bin/python
# coding: utf8

import json
import subprocess
import jwt
import os
from datetime import datetime, timedelta
from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)
secret = os.environ.get('KRATELABS_SECRET', 'kratelabs')


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,Access-Control-Allow-Origin,Accept,Cache-Control')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


class Encode(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('age', type=int, required=True, help='[Error] Must provide <age> (int)')
    parser.add_argument('name', type=str, required=True, help='[Error] Must provide <name> (string)')

    def get(self):
        args = self.parser.parse_args()
        # Token expires in 24 hours
        exp = datetime.utcnow() + timedelta(seconds=60 * 60 * 24)
        token = {'age': args['age'], 'name': args['name'], 'exp': exp}
        encoded = jwt.encode(token, secret, algorithm='HS256')
        return {'token': encoded}


class Product(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('access_token', type=str, required=True, help='[Error] Must provide <access_token> (str)')
    parser.add_argument('lat', type=float, required=True, help='[Error] Must provide <lat> (float)')
    parser.add_argument('lng', type=float, required=True, help='[Error] Must provide <lng> (float)')
    parser.add_argument('zoom', type=float, required=True, help='[Error] Must provide <zoom> (float)')
    parser.add_argument('bearing', type=int, required=True, help='[Error] Must provide <bearing> (int)')
    parser.add_argument('pitch', type=int, required=True, help='[Error] Must provide <pitch> (int)')
    parser.add_argument('email', type=str, required=True, help='[Error] Must provide <email> (str)')
    parser.add_argument('name', type=str, required=True, help='[Error] Must provide <name> (str)')

    def get(self):
        args = self.parser.parse_args()
        command = [
            'kratelabs',
            '--zoom', str(args['zoom']),
            '--lat', str(args['lat']),
            '--lng', str(args['lng']),
            '--bearing', str(args['bearing']),
            '--pitch', str(args['pitch']),
            '--filename', args['name'],
            '--folder', args['email'],
            '--upload',
            '--delete'
        ]
        call = subprocess.check_output(command)
        return json.loads(call)

    def post(self):
        args = self.parser.parse_args()
        command = [
            'kratelabs',
            '--zoom', str(args['zoom']),
            '--lat', str(args['lat']),
            '--lng', str(args['lng']),
            '--bearing', str(args['bearing']),
            '--pitch', str(args['pitch']),
            '--filename', args['name'],
            '--folder', args['email'],
            '--upload',
            '--delete'
        ]
        call = subprocess.check_output(command)
        return json.loads(call)


api.add_resource(Encode, '/encode')
api.add_resource(Product, '/product')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
