FROM mhart/alpine-node
MAINTAINER Denis Carriere - carriere.denis@gmail.com

# Install app dependencies
WORKDIR /src
ADD package.json /src/package.json
RUN npm install

# Run App
ADD . /src
ENV PORT 5000
CMD npm start
