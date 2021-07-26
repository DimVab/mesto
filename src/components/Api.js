class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._renderInitialCards = options.renderInitialCards;
    this._renderUserInfo = options.renderUserInfo;
    this._prependCard = options.prependCard;
    this._countLikes = options.countLikes;
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
    fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers
      })
      .then((res) => {
        return res.json();
      })
      .then((cardInfo) => {
        console.log(cardInfo.likes);
        this._countLikes();
      });
  }

  removeLikeCard(cardID) {
    fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then((res) => {
        return res.json();
      })
      .then((cardInfo) => {
        console.log(cardInfo.likes);
        this._countLikes();
      });
  }
}

export default Api;
