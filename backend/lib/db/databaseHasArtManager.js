import db from './index'

async function databaseHasArtManager() {
  const uniquePosition = 'art_manager'
  const query = await db.get('users').find({role: uniquePosition}).value()

  if (typeof query === 'undefined') {
    return false
  }

  return true
}

export default databaseHasArtManager
