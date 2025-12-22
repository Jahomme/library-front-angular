export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  oauth: {
    clientId: 'client-frontend',
    redirectUri: 'http://localhost:4200/authorized',
    authEndpoint: 'http://localhost:8080/oauth2/authorize',
    tokenEndpoint: 'http://localhost:8080/oauth2/token',
  },
};
