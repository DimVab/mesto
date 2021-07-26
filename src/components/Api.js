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
    fetch(`${this._baseUrl}cards`, {
    method: 'GET',
    headers: this._headers
    })
    .then((res) => {
      return res.json();
    })
    .then((items) => {
      console.log(items);
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
        this._renderUserInfo(userInfo);
      });
  }

  editUserInfo(data) {
    fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json();
      })
      .then((userInfo) => {
        this._renderUserInfo(userInfo);
      });
  }

  addCard(data) {
    fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json();
      })
      .then((cardInfo) => {
        this._prependCard(cardInfo);
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
