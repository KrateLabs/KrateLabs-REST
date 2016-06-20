# KrateLabs REST Server

## Install

**Download** the latest GitHub repository.

```bash
$ git clone git@github.com:KrateLabs/KrateLabs-REST.git
$ cd KrateLabs-REST
$ docker-compose up
```

Using only Docker

```bash
$ docker run -d --name kratelabs -p 5000:5000 -v /home/ubuntu/.stormpath/:/root/.stormpath/ kratelabs
```

Open your favorite browser to `http://localhost`
