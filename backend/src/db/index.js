import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('db.json')
const db = low(adapter)

const defaultSchema = {
  users: [],
}

db.defaults(defaultSchema).write()

export default db
