#!/usr/bin/python
# coding: utf8

import jwt
from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)
secret = 'kratelabs'


class Help(Resource):
    def get(self):
        return {'REST API': [
                    {'/encode': {'arguments': ['age', 'name']}},
                    {'/decode': {'arguments': ['payload']}}
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
    parser.add_argument('payload', type=str, required=True, help='[Error] Must provide <payload> (string)')

    def get(self):
        args = self.parser.parse_args()
        try:
            decoded = jwt.decode(args['payload'], secret, algorithm='HS256')
            return decoded
        except jwt.InvalidTokenError:
            return {'message': {'error': 'Could not decode payload'}}, 403


api.add_resource(Help, '/')
api.add_resource(Encode, '/encode')
api.add_resource(Decode, '/decode')


if __name__ == "__main__":
    app.run(debug=True)
