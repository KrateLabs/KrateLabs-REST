import { Promise } from 'es6-promise'
import { exec } from 'child_process'

export function parseCommand(command) {
  command = command.filter((n) => { if (n) { return n }})
  command = command.join(' ')
  console.log(command)
  return command
}

export default class AWS {
  static S3(options) {
    return new S3(options)
  }
}

class S3 {
  constructor({ bucket='', uri='', recursive=false, region='us-east-1' } = {}) {
    this.bucket = bucket
    this.uri = uri
    this.recursive = recursive
  }

  ls({uri=this.uri,
      bucket=this.bucket,
      path='',
      recursive=this.recursive,
      pageSize,
      region=this.region,
      humanReadable=false,
      summarize=false } = {}) {
    if (!uri) { uri = `${ bucket }${ path }` }
    return new Promise((resolve, reject) => {
      let command = parseCommand([
        'aws', 's3', 'ls',
        uri,
        `${ recursive ? '--recursive' : '' }`,
        `${ humanReadable ? '--human-readable' : '' }`,
        `${ summarize ? '--summarize' : '' }`,
        `${ pageSize ? `--page-size ${ pageSize }` : ''}`,
        `${ region ? `--region ${ region }`: ''}`
      ])
      exec(command, (error, stdout, stderr) => {
        if (error) { reject(stderr.trim()) }
        resolve(stdout.trim())
      })
    })
  }

  cp({source,
      target,
      recursive=this.recursive,
      publicReadWrite=false } = {}) {
    return new Promise((resolve, reject) => {
      let command = parseCommand([
        'aws', 's3', 'cp',
        source,
        target,
        `${ recursive ? '--recursive' : '' }`,
        `${ publicReadWrite ? '--acl public-read-write' : '' }`,
      ])
      exec(command, (error, stdout, stderr) => {
        if (error) { reject(stderr.trim()) }
        resolve(stdout.trim())
      })
    })
  }

  rm({uri=this.uri,
      bucket=this.bucket,
      path='',
      recursive=this.recursive } = {}) {
    if (!uri) { uri = `${ bucket }${ path }` }
    return new Promise((resolve, reject) => {
      let command = parseCommand([
        'aws', 's3', 'rm',
        uri,
        `${ recursive ? '--recursive' : '' }`,
      ])
      exec(command, (error, stdout, stderr) => {
        if (error) { reject(stderr.trim()) }
        resolve(stdout.trim())
      })
    })
  }
}

if (require.main === module) {
  console.log('main')
  const aws = new AWS.S3({ bucket: 's3://kratelabs.com', recursive: true })
  //aws.rm({ path: '/test' })
  //aws.ls({ path: '/test' })
  aws.cp({ source: './uploads/products/12345', target: 's3://kratelabs.com/products/12345', publicReadWrite: true })
    .then(
      data => console.log(data),
      error => console.log(error)
    )
}
