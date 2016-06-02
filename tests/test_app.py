import requests


def test_product():
    payload = {
        'access_token': 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ',
        'lat': 43.64305,
        'lng': -79.37412,
        'zoom': 12.0,
        'bearing': 0,
        'pitch': 0,
        'email': 'carriere.denis@gmail.com',
        'name': 'Cool File'
    }
    r = requests.post('http://localhost:5000/product', data=payload)
    print(r.json())


if __name__ == '__main__':
    test_product()
