class RecordsApi {

  static requestHeaders() {
    const user = this.getUserFromLocalStroage();
    return {'AUTHORIZATION': `Bearer ${user.token}`};
  }

  static getUserFromLocalStroage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  static getAllRecords() {
    const user = this.getUserFromLocalStroage();
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request('http://localhost:8081/records', {
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

  static updateRecord(record) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`http://localhost:8081/records/${record._id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({record: record})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createRecord(record) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request('http://localhost:8081/records/create', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        record: record,
        user: this.getUserFromLocalStroage()
      })
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteRecord(record) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`http://localhost:8081/records/${record._id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request).then(response => {
      return record;
    }).catch(error => {
      return error;
    });
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

export default RecordsApi;
