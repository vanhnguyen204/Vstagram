export class Media {
  private _userId: string;
  private _image: string;
  private _type: string;
  private _timeCreated: string;

  constructor(
    userId: string,
    image: string,
    type: string,
    timeCreated: string,
  ) {
    this._userId = userId;
    this._image = image;
    this._type = type;
    this._timeCreated = timeCreated;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
  get timeCreated(): string {
    return this._timeCreated;
  }

  set timeCreated(value: string) {
    this._timeCreated = value;
  }
}
