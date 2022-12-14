import { model, Schema } from 'mongoose'

const Admin = model(
  'Admin',
  new Schema({
    name: String,
    password: String,
  }),
  'adminUser'
)
export default Admin
