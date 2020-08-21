const REST_API_SERVER = 'https://mean-ddanailov.eu-4.evennode.com'

export const environment = {
  production: true,
  REST_API: {
    list_users: `${REST_API_SERVER}/users`,
    roleArtManagerIsAvailable: `${REST_API_SERVER}/users/role-art-manager-is-available`,
    emailIsUnique: `${REST_API_SERVER}/users/email-is-unique`,
    createUser: `${REST_API_SERVER}/users`,
    deleteUser: `${REST_API_SERVER}/users`,
  },
}
