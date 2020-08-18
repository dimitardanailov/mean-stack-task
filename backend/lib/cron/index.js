import cron from 'node-cron'
import {runCron} from './usersScaper'

cron.schedule('*/2 * * * *', () => {
  console.log('Running the cron. The cronjob task adds dummy date in db.')
  runCron()
})
