class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._renderInitialCards = options.renderInitialCards;
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
}

export default Api;
