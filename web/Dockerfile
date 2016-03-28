FROM python:2-alpine
MAINTAINER Denis Carriere - carriere.denis@gmail.com

# Install app dependencies
ADD requirements.txt /code/requirements.txt
WORKDIR /code
RUN pip install -r requirements.txt

# Expose ports
EXPOSE 5000

# Run app
ADD . /code
CMD gunicorn -w 4 -b :5000 app:app
