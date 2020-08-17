import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

// setup database configurations
const adapter = new FileSync('db.json')
const db = low(adapter)

const defaultSchema = {
  records: [],
}

db.defaults(defaultSchema).write()

export default db
