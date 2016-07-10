import uuid from 'node-uuid'

export const PORT = process.env.PORT || 5000
export const MONGODB = process.env.MONGODB || 'mongodb://kratelabs:kratelabs@ds023052.mlab.com:23052/kratelabs'
export const SECRET = process.env.SECRET || uuid.v4()
