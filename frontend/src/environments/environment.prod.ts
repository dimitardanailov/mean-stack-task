import restAPIconfigurations from './shared/restAPIconfigurations'

const REST_API_SERVER = 'https://mean-ddanailov.eu-4.evennode.com'
const REST_API = restAPIconfigurations(REST_API_SERVER)

export const environment = {
  production: true,
  REST_API,
}
