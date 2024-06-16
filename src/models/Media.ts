export class Media {
  readonly userId: string;
  readonly imageMedia: string[];
  readonly audioMedia: string;
  readonly type: string;
  readonly timePlay: number;

  constructor(
    userId: string,
    imageMedia: string[],
    audioMedia: string,
    type: string,
    timePlay: number,
  ) {
    this.userId = userId;
    this.imageMedia = imageMedia;
    this.audioMedia = audioMedia;
    this.type = type;
    this.timePlay = timePlay;
  }
  getUserId(): string {
    return this.userId;
  }
  getImageMedia(): string[] {
    return this.imageMedia;
  }
  getAudioMedia(): string {
    return this.audioMedia;
  }
  getType(): string {
    return this.type;
  }
  getTimePlay(): number {
    return this.timePlay;
  }
}
