export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName : this._name.textContent,
      userJob: this._job.textContent
    };

    return userInfo;
  }

  setInitialUserInfo(data) {
    // чтобы при открытии сайта загружалась в том числе информация об актуальном аватаре
    this.setUserInfo(data);
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
  }
}
