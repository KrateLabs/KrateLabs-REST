import 'isomorphic-fetch'
import { Promise } from 'es6-promise'
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
  createAccount(payload) {
    let url = `https://${ encodeURIComponent(this.authentication) }@api.stormpath.com/v1/applications/${ this.application }/accounts`
    url = 'http://requestb.in/uwektzuw'
    return Request.post(url, payload)
  }
}

if (require.main === module) {
  const stormpath = new Stormpath({
    application: 'zDhRIszpk93AwssJDXuPs',
    authentication: '1HU99B538PG3SW50K5M2NPJBW:7ukbB9oDRjgyMEX/057SKtAwwLtOR3fbKvNQOp4i/uI'
  })
  const account = {
    givenName: 'Denis',
    surname: 'Storm',
    username: 'DenisC2',
    email: 'foo.bar2@gmail.com',
    password: 'Password123',
    customData: { number: 4 }
  }
  stormpath.createAccount(account).then(
    data => console.log(data),
    error => console.log(error)
  )
}
