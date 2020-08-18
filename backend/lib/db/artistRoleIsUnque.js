import db from './index'

async function artistRoleIsUnque() {
  const uniquePosition = 'Art Manager'
  const dbHasArtManager = await db
    .get('users')
    .find({role: uniquePosition})
    .value()

  if (typeof dbHasArtManager === 'undefined') {
    return true
  }

  return false
}

export default artistRoleIsUnque
