export default class UserInfo {
  constructor({name, job}) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const userInfo = {
      name : this._name.querySelector('.profile__name').textContent,
      job: this._job.querySelector('.profile__job').textContent
    };

    return userInfo;
  }

  setUserInfo() {

  }
}
