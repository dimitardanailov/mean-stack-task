const db = require('../db')
const uniqueEmails = require('../unique')
const dummyData = require('./dummyData.json')

async function runCron() {
  const users = await db.get('users').value()
  if (users.length > 0) return

  /**
   * CSV import is a common feature for users import.
   * The current workflow emulates csv import or json import .
   */
  const dummyUsers = uniqueEmails(dummyData.users)

  dummyUsers.forEach(user => {
    db.get('users').push(user).write()
  })
}

module.exports = runCron
