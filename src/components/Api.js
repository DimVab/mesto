class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
    method: 'GET',
    headers: this._headers
    })
    .then((res) => {
      return res.json();
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers
      })
      .then((res) => {
        return res.json();
      });
  }

  getInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json();
      });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json();
      });
  }

  likeCard(cardID) {
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers
      })
      .then((res) => {
        return res.json();
      });
  }

  removeLikeCard(cardID) {
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then((res) => {
        return res.json();
      });
  }

  getCardLikesData(cardID) {
    // эта ф-я будет с интервалом запрашивать кол-во лайков и обновлять их в then в index.js
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: 'GET',
      headers: this._headers
      })
      .then((res) => {
        console.log(res);
        return res.json();
      });
  }
}

export default Api;
