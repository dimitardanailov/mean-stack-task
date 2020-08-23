async function request(next, url, params = null, method = 'GET') {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const promise = fetch(url, options)
    .then(next)
    .catch(err => {
      return generateErrorResponse(`${url} is unreachable`, err)
    })

  return promise
}

function generateErrorResponse(message, err) {
  console.error(err)
  console.error(message)
}

export default request
