import 'isomorphic-fetch'
import base64 from 'base-64'
import utf8 from 'utf8'
import Request from './Request'

function encodeAccount(username, password) {
  let bytes = utf8.encode(`${ username }:${ password }`)
  return base64.encode(bytes)
}

export default class Stormpath {
  constructor({ application, authentication } = {}) {
    this.application = application
    this.authentication = authentication
  }
  retrieveApplication() {
    let url = `https://api.stormpath.com/v1/applications/${ this.application }/accounts`
    let options = { authentication: this.authentication }
    return Request.get(url, options)
  }

  createAccount(payload) {
    let url = `https://api.stormpath.com/v1/applications/${ this.application }/accounts`
    let options = {
      authentication: this.authentication,
      payload: payload
    }
    return Request.post(url, options)
  }

  retrieveAccount(account) {
    let url = `https://api.stormpath.com/v1/accounts/${ account }`
    let options = {
      authentication: this.authentication
    }
    return Request.get(url, options)
  }

  authenticateAccount({ username, password } = {}) {
    let url = `https://api.stormpath.com/v1/applications/${ this.application }/loginAttempts`
    //url = 'http://requestb.in/uwektzuw'
    let payload = {
      type: 'basic',
      value: encodeAccount(username, password)
    }
    let options = {
      authentication: this.authentication,
      payload: payload
    }
    return Request.post(url, options)
  }
}

if (require.main === module) {
  const credentials = {
    application: 'zDhRIszpk93AwssJDXuPs',
    authentication: {
      username: '1HU99B538PG3SW50K5M2NPJBW',
      password: '7ukbB9oDRjgyMEX/057SKtAwwLtOR3fbKvNQOp4i/uI'
    }
  }
  const account = {
    givenName: 'Denis',
    surname: 'Storm',
    username: 'DenisCarriere',
    email: 'foo.bar2@gmail.com',
    password: 'Denis44C',
    customData: { number: 4 }
  }

  const stormpath = new Stormpath(credentials)
  //stormpath.createAccount(account)
  //stormpath.retrieveApplication()
  stormpath.authenticateAccount(account)
  stormpath.retrieveAccount('3NElH12QutCmRSi3e6PAmI')
    .then(
      data => console.log(data),
      error => console.log(error)
    )
}
