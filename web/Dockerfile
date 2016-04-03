FROM python:alpine
MAINTAINER Denis Carriere - carriere.denis@gmail.com

# Install app dependencies
WORKDIR /src
ADD requirements.txt /src/requirements.txt
RUN pip install -r requirements.txt

# Run App
ADD . /src
