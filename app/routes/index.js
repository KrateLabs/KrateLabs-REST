import User from './user'
import Api from './api'
import Product from './product'
import Token from './token'
import Github from './github'

const routes = {
  user: User,
  api: Api,
  product: Product,
  token: Token,
  github: Github
}

export const { user, api, product, token, github } = routes
export default routes
