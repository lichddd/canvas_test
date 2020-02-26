export default class GameInfo extends createjs.Container{
  constructor(){
    super();
    this.score = new createjs.Text(`打中:0 被打中:0`, "16px  Arial", "#FFF");
    this.score.x = 10;
    this.score.y = 10;
    this.fps={date:0,currentTime:0,time:0,count:0,FPS:0};
    this.addChild(this.score);
    createjs.Ticker.addEventListener("tick", ()=>{this.updateFPS()});
  }
  updateScore(s,f){
    this.score.text = `打中:${s} 被打中:${f} FPS:${this.fps.FPS}`;
  }
  updateFPS(){
    
    this.fps.date = new Date();
    this.fps.currentTime = this.fps.date.getTime();
    if(this.fps.time!=0&&this.fps.count%40==0)
    {
      this.fps.FPS = Math.ceil(1000/(this.fps.currentTime -  this.fps.time));
    }
    this.fps.time = this.fps.currentTime;
    this.fps.count++;
    if (this.fps.count>999999999) {
      this.fps.count=0;
    }
  }
}
