import test from 'ava'
import Request from '../app/utils/Request'

const API_URL = 'http://localhost:5000'

test('Root API', t => {
  return Request.get(`${ API_URL }/`)
    .then(data => {
      t.true(data.ok)
      t.deepEqual(data.status, 200)
    }, error => {
      if (error) return t.ifError(error.message)
    })
})

/*
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
*/
