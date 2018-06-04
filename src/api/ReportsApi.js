class ReportsApi {
  static requestHeaders() {
    const user = this.getUserFromLocalStroage();
    return {'AUTHORIZATION': `Bearer ${user.token}`};
  }

  static getUserFromLocalStroage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  static getReports() {
    const user = this.getUserFromLocalStroage();
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request('http://localhost:8081/records/report', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({user: user})
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default ReportsApi;
