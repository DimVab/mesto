class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._renderInitialCards = options.renderInitialCards;
    this._renderUserInfo = options.renderUserInfo;
  }

  getInitialCards() {
    fetch(`${this._baseUrl}cards`, {
    method: 'GET',
    headers: this._headers
    })
    .then((res) => {
      return res.json();
    })
    .then((items) => {
      this._renderInitialCards(items);
    });
  }

  getUserInfo() {
    fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers
      })
      .then((res) => {
        return res.json();
      })
      .then((userInfo) => {
        console.log(userInfo);
        this._renderUserInfo(userInfo);
      });
  }
}

export default Api;
