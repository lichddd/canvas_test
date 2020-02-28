export default class Music {
  constructor() {
    this.bgmAudio = new Audio()
    this.bgmAudio.volume = 0.5;
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'static/audio/night_of_nights.mp3'
    this.playBgm();
  }
  playBgm() {
    this.bgmAudio.play()
  }
}
