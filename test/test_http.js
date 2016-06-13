import test from 'ava'
import { Promise } from 'es6-promise'
import nock from 'nock'
import Request from 'utils/Request'

const API_URL = 'http://localhost:8080'
const user = {name: 'Denis', email: 'carriere.denis@gmail.com'}
const userFail = {name: 'FAIL', email: 'failing@email.com'}
const api = new Request(API_URL)

test('Create user', t => {
  return api.post('/user', user)
    .then(({ data, error }) => {
      if (error) return t.ifError(error.message)
      t.true(data.ok)
      t.deepEqual(data.status, 200)
    })
})

test('Retrieve single user', t => {
  return api.get(`/user/${ user.name }`)
    .then(({ data, error }) => {
      if (error) return t.ifError(error.message)
      t.true(data.ok)
      t.deepEqual(data.status, 200)
    })
})

test('Retrieve single 404 user', t => {
  return api.get(`/user/${ userFail.name }`)
    .then(({ data, error }) => {
      if (error) return t.ifError(error.message)
      t.true(!data.ok)
      t.deepEqual(data.status, 404)
    })
})

test('Retrieve mutliple users', t => {
  return api.get('/user')
    .then(({ data, error }) => {
      if (error) return t.ifError(error.message)
      t.true(data.ok)
      t.deepEqual(data.status, 200)
    })
})

test('Delete user', t => {
  return api.delete(`/user/${ user.name }`)
    .then(({ data, error }) => {
      if (error) return t.ifError(error.message)
      t.true(data.ok)
      t.deepEqual(data.status, 200)
    })
})
