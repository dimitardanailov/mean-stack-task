const db = require('./index')

async function databaseHasArtManager() {
  const uniquePosition = 'art_manager'
  const query = await db.get('users').find({role: uniquePosition}).value()

  if (typeof query === 'undefined') {
    return false
  }

  return true
}

module.exports = databaseHasArtManager
