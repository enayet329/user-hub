const apiUrl = 'https://www.userhub.somee.com/api/UserHub';

export const ApiEndPoint = {
  Auth: {
    Login: `${apiUrl}/login`,
    Register: `${apiUrl}/register`,
    GetUsers: `${apiUrl}`,
    Block: `${apiUrl}/block`,
    Unblock: `${apiUrl}/unblock`,
    Delete: `${apiUrl}/delete`,
  },
};

export const LocalStorage = {
    token:'USER_TOKEN',
}