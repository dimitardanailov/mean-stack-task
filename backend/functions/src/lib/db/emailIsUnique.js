const db = require('./index')

async function dbEmailIsUnque(email) {
  const emailIsUnique = await db.get('users').find({email: email}).value()

  if (typeof emailIsUnique === 'undefined') {
    return true
  }

  return false
}

module.exports = dbEmailIsUnque
