FROM python:2-alpine
MAINTAINER Denis Carriere - carriere.denis@gmail.com

# Install app dependencies
ADD requirements.txt /src/requirements.txt
WORKDIR /src
RUN pip install -r requirements.txt

# Expose ports
EXPOSE 5000

# Run app
ADD . /src
CMD python app.py
