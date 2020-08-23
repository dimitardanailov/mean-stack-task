function restAPIconfigurations(REST_API_SERVER) {
  return {
    list_users: `${REST_API_SERVER}/users`,
    roleArtManagerIsAvailable: `${REST_API_SERVER}/users/role-art-manager-is-available`,
    emailIsUnique: `${REST_API_SERVER}/users/email-is-unique`,
    createUser: `${REST_API_SERVER}/users`,
    updateUser: `${REST_API_SERVER}/users`,
    deleteUser: `${REST_API_SERVER}/users`,
  }
}

export default restAPIconfigurations
