import test from 'ava'
import { Promise } from 'es6-promise'
import Api from 'utils/Api'
import nock from 'nock'

const api = new Api('http://localhost:8080')
const user = {name: 'Denis', email: 'carriere.denis@gmail.com'}

test('Create user', t => {
  api.post('/user', user)
    .then(({ response, error }) => {
      t.ifError(error)
      t.true(response.ok)
    })
})

test('Retrieve single user', t => {
  api.get(`/user/${ user.name }`)
    .then(({ response, error }) => {
      t.ifError(error)
      t.true(response.ok)
    })
})

test('Retrieve mutliple users', t => {
  api.get('/user')
    .then(({ response, error }) => {
      t.ifError(error)
      t.true(response.ok)
    })
})

test('Delete user', t => {
  api.delete(`/user/${ user.name }`)
    .then(({ response, error }) => {
      t.ifError(error)
      t.true(response.ok)
    })
})
