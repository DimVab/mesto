export default class UserInfo {
  constructor({name, job}) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const userInfo = {
      userName : document.querySelector(this._name).textContent,
      userJob: document.querySelector(this._job).textContent
    };

    return userInfo;
  }

  setUserInfo(data) {
    document.querySelector(this._name).textContent = data.name;
    document.querySelector(this._job).textContent = data.profession;
  }
}
