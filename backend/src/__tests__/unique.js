import unique from '../unique'
import dummyData from '../cron/dummyData.json'

test('unique', () => {
  const users = unique(dummyData.users)

  expect(users).toHaveLength(6)
})
