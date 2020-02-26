

import './libs/ease'
import Player from './player/index'
import Boss from './npc/boss'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import config from '@/config'

const screenWidth = 480
const screenHeight = 640




const levels=
[
  {name:'等级1',player:5,boss:[10,5,2]},
  {name:'等级2',player:10,boss:[20,10,4]},
  {name:'等级3',player:20,boss:[40,20,8]},
  {name:'等级4',player:40,boss:[80,40,16]},
  {name:'等级5',player:80,boss:[160,80,32]},
  {name:'等级6',player:160,boss:[320,160,64]},
]
;
/**
 * 游戏主函数
 */
export default class Main {
  constructor(canvas) {
    // wx.setPreferredFramesPerSecond(60);
    this.canvas=canvas;
    this.select_level=0;
    this.frame=0;
    this.score=0;
    this.defance=0;
    this.music= new Music();
    createjs.Ticker.setFPS(60);
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    

    levels.forEach((l,i)=>{

      let b=document.createElement('button');
      b.innerHTML=l.name;
      document.querySelector('#appC').append(b);
      b.addEventListener('click',()=>{this.select_level=i;this.init()});

    });



    this.init();

    window.requestAnimationFrame(
      this.TimerHandel.bind(this),
      this.canvas
    );



    window.addEventListener('keydown',(e)=>{
      if (e.key=="a") {
        if (alock) {
          return ;
        }
        alock=true;
        this.player.player.speedx=-5;
      }
      if (e.key=="d") {
        if (dlock) {
          return ;
        }
        dlock=true;
        this.player.player.speedx=5;
      }
      if (e.key=="w") {
        if (wlock) {
          return ;
        }
        wlock=true;
        this.player.player.speedy=-5;
      }
      if (e.key=="s") {
        if (slock) {
          return ;
        }
        slock=true;
        this.player.player.speedy=5;
      }


    });
    let alock=false;
    let dlock=false;
    let wlock=false;
    let slock=false;
    window.addEventListener('keyup',(e)=>{
      if (e.key=="a") {
        alock=false;
        this.player.player.speedx=0;
      }
      if (e.key=="d") {
        dlock=false;
        this.player.player.speedx=0;
      }
      if (e.key=="w") {
        wlock=false;
        this.player.player.speedy=0;
      }
      if (e.key=="s") {
        slock=false;
        this.player.player.speedy=0;
      }



    });
  }
  init(user_info=""){
    this.stage = new createjs.Stage(this.canvas);
    this.bg = new BackGround();
    this.stage.addChild(this.bg);
    this.player = new Player(this.stage,user_info.avatarUrl,'你',levels[this.select_level].player);
    this.stage.addChild(this.player);
    this.boss = new Boss(this.stage,levels[this.select_level].boss);
    this.stage.addChild(this.boss);
    this.gameinfo =new GameInfo();
    this.stage.addChild(this.gameinfo);



  }
  
  TimerHandel() {
    this.frame++;
    if(this.frame>999999999){
      this.frame=0;
    }
    if (this.frame % 30 === 0) {
      this.player.shoot();
    }

    this.bg.update();

    this.player.update(true);

    this.boss.update(true);
    this.collisionDetection();
    this.stage.update();
    this.gameinfo.updateScore(this.score,this.defance);
    window.requestAnimationFrame(
      this.TimerHandel.bind(this),
      this.canvas
    )
  }
  isCollideWith(rectObj,pointObj) {
    let spX = pointObj.x;
    let spY = pointObj.y;
    return !!(spX >= rectObj.x - rectObj.width / 2
      && spX <= rectObj.x + rectObj.width / 2
      && spY >= rectObj.y - rectObj.height / 2
      && spY <= rectObj.y + rectObj.height / 2)
  }
  collisionDetection() {
    let that = this;
    let pp={x:this.player.player.x,y:this.player.player.y};
    let br={x:this.boss.player.x,y:this.boss.player.y,width:this.boss.player.width,height:this.boss.player.height};
    this.player.bullet.list.forEach((bu) => {
      if ( this.isCollideWith(br,bu)&&!bu.isdie) {
        bu.die();
        this.score += 1;
      }
    });
    this.boss.bullets.forEach((bu) => {
      bu.list.forEach((b) => {
        if ( this.isCollideWith(b,pp)&&!b.isdie) {
          b.die();
          this.defance += 1;
        }
      });
    });
  }
}
