import restAPIconfigurations from './shared/restAPIconfigurations'

const REST_API_SERVER = 'http://localhost:8080'
const REST_API = restAPIconfigurations(REST_API_SERVER)

export const environment = {
  production: false,
  REST_API,
}
