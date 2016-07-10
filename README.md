[![Build Status](https://travis-ci.org/KrateLabs/KrateLabs-REST.svg?branch=master)](https://travis-ci.org/KrateLabs/KrateLabs-REST)

# KrateLabs REST Server

## Install

**Download** the latest GitHub repository.

```bash
$ git clone git@github.com:KrateLabs/KrateLabs-REST.git
$ cd KrateLabs-REST
$ npm start
```

Run as background process

```bash
$ nohup npm start &
$ disown
$ exit
```

Using Docker

```bash
$ docker run --rm -it -e "PORT=5000" -e "SECRET=default" -p 5000:5000 kratelabs
```

Open your favorite browser to `http://localhost`
