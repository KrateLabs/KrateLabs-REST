import { Promise } from 'es6-promise'
import fetch from 'isomorphic-fetch'
import { exec } from 'child_process'

export function parseCommand(command) {
  command = command.filter((n) => { if (n) { return n }})
  command = command.join(' ')
  console.log(command)
  return command
}

export default class Kratelabs {
  constructor({ access_token, style } = {}) {
    this.access_token = access_token
    this.style = style
  }
  help() {
    return new Promise((resolve, reject) => {
      let command = parseCommand([
        'kratelabs',
        '--help'
      ])
      exec(command, (error, stdout, stderr) => {
        if (error) { reject(stderr.trim()) }
        resolve(stdout.trim())
      })
    })
  }

  create({
      style=this.style,
      access_token=this.access_token,
      filename,
      lat,
      lng,
      zoom,
      bearing=0,
      pitch=0} = {}) {
    return new Promise((resolve, reject) => {
      let command = parseCommand([
        'kratelabs',
        `${ access_token ? `--access_token ${ access_token }` : '' }`,
        `${ filename ? `--filename ${ filename }` : '' }`,
        `${ lat ? `--lat ${ lat }` : '' }`,
        `${ lng ? `--lng ${ lng }` : '' }`,
        `${ zoom ? `--zoom ${ zoom }` : '' }`,
        `${ bearing ? `--bearing ${ bearing }` : '' }`,
        `${ pitch ? `--pitch ${ pitch }` : '' }`,
        `${ style ? `--style ${ style }` : '' }`
      ])
      exec(command, (error, stdout, stderr) => {
        if (stdout.trim() !== 'OK') { reject(stderr) }
        resolve(stdout.trim())
      })
    })
  }
}

if (require.main === module) {
  const kratelabs = new Kratelabs({
    access_token: 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ',
    style: 'mapbox://styles/addxy/cim6u5lfi00k2cwm23exyzjim'
  })

  kratelabs.create({
    filename: './uploads/products/12345/12345',
    lat: 45.123,
    lng: -75.123,
    zoom: 10,
    bearing: 0,
    pitch: 0
  }).then(
    data => console.log(data),
    error => console.log(error)
  )
}
