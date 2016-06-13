import humps, { camelizeKeys, decamelizeKeys, decamelize } from 'humps'
import { Promise } from 'es6-promise'
import fetch from 'isomorphic-fetch'
import FormData from 'form-data'

function loadFormData(payload) {
  if (!payload) return undefined
  let data = new FormData()
  Object.keys(payload).map((key) => {
    data.append(key, payload[key])
  })
  return data
}

function loadFormUrlencoded(payload) {
  if (!payload) return undefined
  let data = []
  Object.keys(payload).map((key) => {
    data.push(`${ key }=${ payload[key] }`)
  })
  return data.join('&')
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function request({ url, endpoint=null, method='get', data=null, params=null } = {}) {
  if (endpoint) url += `${ endpoint }`
  if (params) url += `?${ loadFormUrlencoded(params) }`

  let headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache'
  })
  let options = {
    headers: headers,
    method: method,
    body: loadFormUrlencoded(data)
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(
      data => ({ data }),
      error => ({ error })
    )
}

export default class Request {
  constructor(url) {
    this.url = url
  }
  get(endpoint, params) {
    return request({url: this.url, endpoint: endpoint, method: 'get', params: params})
  }
  post(endpoint, payload) {
    return request({url: this.url, endpoint: endpoint, method: 'post', data: payload})
  }
  put(endpoint, payload) {
    return request({url: this.url, endpoint: endpoint, method: 'put', data: payload})
  }
  delete(endpoint, payload) {
    return request({url: this.url, endpoint: endpoint, method: 'delete', data: payload})
  }
}

if (require.main === module) {
  const api = new Request('http://localhost:5000/user')
  api.get('', {hello: 'world'})
    .then(({ data, error }) => {
      console.log(data)
      console.log(error)
    })
}
