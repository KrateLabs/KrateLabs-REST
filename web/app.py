#!/usr/bin/python
# coding: utf8

import jwt
import os
from datetime import datetime, timedelta
from redis import Redis
from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)
redis = Redis(host='redis', port=6379)
secret = os.environ.get('KRATELABS_SECRET', 'kratelabs')


class Help(Resource):
    def get(self):
        redis.incr('hits')
        return {'visits': int(redis.get('hits'))}


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


class Decode(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('token', type=str, required=True, help='[Error] Must provide <token> (string)')

    def get(self):
        args = self.parser.parse_args()
        try:
            decoded = jwt.decode(args['token'], secret, algorithm='HS256')
            del decoded['exp']
            return decoded
        except jwt.InvalidTokenError:
            return {'message': {'error': 'Could not decode <token>'}}, 403


api.add_resource(Help, '/')
api.add_resource(Encode, '/encode')
api.add_resource(Decode, '/decode')


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
