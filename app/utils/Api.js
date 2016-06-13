import humps, { camelizeKeys, decamelizeKeys, decamelize } from 'humps'
import fetch from 'isomorphic-fetch'
import FormData from 'form-data'

export function loadFormData(payload) {
  if (!payload) return undefined
  let data = new FormData()
  Object.keys(payload).map((key) => {
    data.append(key, payload[key])
  })
  return data
}

export function loadFormUrlencoded(payload) {
  if (!payload) return undefined
  let data = []
  Object.keys(payload).map((key) => {
    data.push(`${ key }=${ payload[key] }`)
  })
  return data.join('&')
}

export default function request({ url, endpoint=null, method='get', data=null, params=null } = {}) {
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
    .then(response => {
      if (!response.ok) { return Promise.reject('Connection Issue') }
      return response
    })
    .then(
      response => ({ response }),
      error => ({ error })
    )
}

export default class Api {
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
  const api = new Api('http://requestb.in/10lz7of1')
  api.get('', {hello: 'world'})
    .then(({ response, error }) => {
      console.log(response.statusText)
    })
}
