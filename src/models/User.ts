export class User {
  private _email: string;
  private _fullName: string;
  private _avatar: string;
  private _token: string;
  constructor(email: string, fullName: string, avatar: string, token: string) {
    this._email = email;
    this._fullName = fullName;
    this._avatar = avatar;
    this._token = token;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
