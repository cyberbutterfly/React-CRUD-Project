class SessionApi {
  static login(credentials) {
    const request = new Request('http://localhost:8081/authentication/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ auth: credentials})
    });

    return fetch(request).then(response => {
        return response.json();
    }).catch(error => {
      return error;
    });
  }

  static signup(signupInfo) {
    const request = new Request('http://localhost:8081/authentication/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ auth: signupInfo })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default SessionApi;
