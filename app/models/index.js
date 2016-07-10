import user from './User'
import product from './Product'
import log from './Log'
import token from './Token'

const models = {
  User: user,
  Product: product,
  Log: log,
  Token: token
}

export const { User, Product, Log, Token } = models
export default models
