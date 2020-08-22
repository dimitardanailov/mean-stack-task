import db from './index'

async function dbEmailIsUnque(email) {
  const emailIsUnique = await db.get('users').find({email: email}).value()

  if (typeof emailIsUnique === 'undefined') {
    return true
  }

  return false
}

export default dbEmailIsUnque
