const cron = require('node-cron')
const runCron = require('./usersScaper')

cron.schedule('*/2 * * * *', () => {
  console.log('Running the cron. The cronjob task adds dummy date in db.')
  runCron()
})
