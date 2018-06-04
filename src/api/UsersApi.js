class UsersApi {
  static requestHeaders() {
    const user = this.getUserFromLocalStroage();
    return {'AUTHORIZATION': `Bearer ${user.token}`};
  }

  static getUserFromLocalStroage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  static getAllUsers() {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request('http://localhost:8081/users', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({user: this.getUserFromLocalStroage()})
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createUser(user) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request('http://localhost:8081/users/create', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ user: user })
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateUser(user) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`http://localhost:8081/users/${user._id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({user: user})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteUser(user) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`http://localhost:8081/users/${user._id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request).then(response => {
      return user;
    }).catch(error => {
      return error;
    });
  }
}

export default UsersApi;
