import db from '../db'
import uniqueEmails from '../unique'
import dummyData from './dummyData.json'

async function runCron() {
  const users = await db.get('users').value()
  if (users.length > 0) return

  const dummyUsers = uniqueEmails(dummyData.users)

  db.get('users').push(dummyUsers).write()
}

export {runCron}
