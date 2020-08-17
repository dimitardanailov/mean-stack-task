import dummyData from './dummyData.json'
import uniqueEmails from '../unique'

async function runCron() {
  const users = uniqueEmails(dummyData.records)

  console.log('users', users)
}

export {runCron}
