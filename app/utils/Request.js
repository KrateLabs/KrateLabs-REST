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
    data.push(`${ key }=${ JSON.stringify(payload[key]) }`)
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

function request(url, { endpoint=null, method='get', data=null, params=null } = {}) {
  if (endpoint) url += `${ endpoint }`
  if (params) url += `?${ loadFormUrlencoded(params) }`

  let headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  })
  let options = {
    headers: headers,
    method: method,
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(data)
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

export default class Request {
  static get(url, params) {
    return request(url, { method: 'get', params: params })
  }
  static post(url, payload) {
    return request(url, { method: 'post', data: payload })
  }
  static put(url, payload) {
    return request(url, { method: 'put', data: payload })
  }
  static delete(url, payload) {
    return request(url, { method: 'delete', data: payload })
  }
}

if (require.main === module) {
  Request.get('http://localhost:8000/product', { hello: 'world' })
    .then(
      data => console.log(data),
      error => console.log(error)
    )
}
