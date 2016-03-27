#!/usr/bin/python
# coding: utf8

import jwt
import os
from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)
secret = os.environ.get('KRATELABS_SECRET', 'kratelabs')


class Help(Resource):
    def get(self):
        host = 'http://localhost:5000'
        encode_example = '{}/encode?age=30&name=Denis'.format(host)
        decode_example = '{}/decode?token'.format(host)
        return {'REST API': [
                    {'/encode': {'arguments': ['age', 'name'], 'example': encode_example}},
                    {'/decode': {'arguments': ['token'], 'example': decode_example}}
                ]}


class Encode(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('age', type=int, required=True, help='[Error] Must provide <age> (int)')
    parser.add_argument('name', type=str, required=True, help='[Error] Must provide <name> (string)')

    def get(self):
        args = self.parser.parse_args()
        payload = {'age': args['age'], 'name': args['name']}
        encoded = jwt.encode(payload, secret, algorithm='HS256')
        return {'payload': encoded}


class Decode(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('payload', type=str, required=True, help='[Error] Must provide <token> (string)')

    def get(self):
        args = self.parser.parse_args()
        try:
            decoded = jwt.decode(args['token'], secret, algorithm='HS256')
            return decoded
        except jwt.InvalidTokenError:
            return {'message': {'error': 'Could not decode <token>'}}, 403


api.add_resource(Help, '/')
api.add_resource(Encode, '/encode')
api.add_resource(Decode, '/decode')


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
