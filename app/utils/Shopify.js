import 'isomorphic-fetch'
import { Promise } from 'es6-promise'
import { variants, options, product } from './kratelabs'

export default class Shopify {
  headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(apikey, password) {
    this.apikey = apikey
    this.password = password
  }

  static checkStatus(response) {
    if (!response.ok) throw new Error('Connection issue')
    return response
  }

  async listProducts() {
    return new Promise((resolve, reject) => {
      let url = `https://${ this.apikey }:${ this.password }@krate-labs.myshopify.com/admin/products.json`
      let options = {
        method: 'get',
        headers: this.headers,
        credentials: 'include',
        mode: 'cors',
        cache: 'default'
      }
      fetch(url, options)
        .then(this.checkStatus)
        .then(response => response.json())
        .then(data => resolve(data))
    })
  }

  async createProduct(product) {
    return new Promise((resolve, reject) => {
      let url = `https://${ this.apikey }:${ this.password }@krate-labs.myshopify.com/admin/products.json`
      let options = {
        method: 'post',
        headers: this.headers,
        credentials: 'include',
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
      }
      fetch(url, options)
        .then(this.checkStatus)
        .then(response => response.json())
        .then(data => resolve(data))
    })
  }
}

async function main() {
  let apikey = '40676c7d883263065f21a0f02e926af4'
  let password = '1b94c846c093bee5ef1a14a65e066450'
  const shopify = new Shopify(apikey, password)

  //shopify.listProducts()
  //  .then(products => console.log(products.products))
  shopify.createProduct(product('Denis'))
    .then(product => console.log(product))

}
//main()
