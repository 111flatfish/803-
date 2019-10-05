import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/bg.jpg'
const BG_WIDTH     = 512
const BG_HEIGHT    = 750

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
    this.river = new Image();
    this.rubbish = new Image();
    this.bin = new Image();
    this.stab = new Image();
    this.stab.src = "images/stab.png"
    this.river.src = "images/river.jpg";
    this.rubbish.src = "images/rubbish.png";
    this.bin.src = "images/bin.jpg";
    this.top = 190;
    this.bgmode = 0;
    this.isPlaying = false;
    this.index = 0;
    this.count = 10;
    this.interval = 1000/300;
    this.loop = false;
    this.timer = null;
    this.render(ctx)
  }

  update(value) {
    switch (value) {
      case 0:
        break;
      case 1:
        top += 20;
        break;
      case -1:
        top -= 20;
        break;
    }
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
      ctx.drawImage(
        this.img,
        0,
        0,
        this.width,
        this.height
      );

    for(let i = 0; i < 11; i++){
      ctx.drawImage(
        this.stab,
          (i*40)  ,
          120,
          40,
          20

      );
    }
    // 缓冲区
    ctx.fillStyle = '#FFF';
    ctx.setLineDash([10,10]);
    ctx.beginPath();
    ctx.moveTo(0,140);
    ctx.lineTo(450,140);
    ctx.moveTo(0,250);
    ctx.lineTo(450,250);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.fillStyle="#FF0000";
    ctx.beginPath();
    for(let i = 0 ;i < 4;i++){
      ctx.arc((110+i*20),22,8,0,Math.PI*2,true);
    }
    for(let i = 0 ;i < 4;i++){
      ctx.arc((250+i*20),22,8,0,Math.PI*2,true);
    }
    ctx.closePath();
    ctx.fill();

    ctx.drawImage(
        this.river,
        40,
        0,
        50,
        50
    );

    ctx.drawImage(
      this.rubbish,
      this.top,
      0,
      50,
      50
    );

    ctx.drawImage(
      this.bin,
      340,
      0,
      50,
      50
    );

    ctx.fillStyle = "#ccc"
    ctx.fillRect(0,screenHeight-50,512,50)
    ctx.fillStyle = "#ef4238";
    ctx.beginPath();
    ctx.arc(screenWidth/2,screenHeight-52,30,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();



    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   -screenHeight + this.top,
    //   screenWidth,
    //   screenHeight
    // )

    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   this.top,
    //   screenWidth,
    //   screenHeight
    // )
  }
  changeBgRender(ctx,mode){
    let Interval ;
    let gar1 = new Image();
    let gar2 = new Image();
    let gar3 = new Image();
    let goo1 = new Image();
    let goo2 = new Image();
    let goo3 = new Image();
    let goo4 = new Image();
    let goo5 = new Image();
    gar1.src = "images/rubbish1.png"
    gar2.src = "images/rubbish2.png"
    gar3.src = "images/rubbish3.png"
    goo1.src = "images/butter1.png"
    goo2.src = "images/butter2.png"
    goo3.src = "images/flower1.png"
    goo4.src = "images/flower2.png"
    goo5.src = "images/flower3.png"
    switch (mode) {
      case 0:
        break;
      case 1:
        ctx.drawImage(gar1,135,200,30,30);
        ctx.drawImage(gar2,20,250,30,30);
        ctx.drawImage(gar3,220,230,30,30);
        break;
      case 2:
        ctx.drawImage(gar1,135,200,30,30);
        ctx.drawImage(gar2,20,250,30,30);
        ctx.drawImage(gar3,220,230,30,30);
        ctx.drawImage(gar1,300,250,30,30);
        ctx.drawImage(gar2,250,400,30,30);
        ctx.drawImage(gar3,350,300,30,30);
        ctx.beginPath();
        ctx.fillStyle = `rgba(155, 55, 33,0.3)`;
        ctx.fillRect(0, 0, 450, 750);
        break;
      case 3:
        ctx.drawImage(gar1,135,200,30,30);
        ctx.drawImage(gar2,20,250,30,30);
        ctx.drawImage(gar3,220,230,30,30);
        ctx.drawImage(gar1,300,250,30,30);
        ctx.drawImage(gar2,250,400,30,30);
        ctx.drawImage(gar3,350,300,30,30);
        ctx.drawImage(gar1,50,350,30,30);
        ctx.drawImage(gar2,100,380,30,30);
        ctx.drawImage(gar3,20,420,30,30);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(155, 55, 33, 0.5)';
        ctx.fillRect(0,0,450,750);
        break;
      case 4:
        ctx.drawImage(goo1,135,200,30,30);
        ctx.drawImage(goo2,20,250,30,30);
        ctx.drawImage(goo3,220,230,30,30);
        break;
      case 5:
        ctx.drawImage(goo1,135,200,30,30);
        ctx.drawImage(goo2,20,250,30,30);
        ctx.drawImage(goo3,220,230,30,30);
        ctx.drawImage(goo1,300,250,30,30);
        ctx.drawImage(goo2,250,400,30,30);
        ctx.drawImage(goo3,350,300,30,30);
        break;
      case 6:
        ctx.drawImage(goo1,135,200,30,30);
        ctx.drawImage(goo2,20,250,30,30);
        ctx.drawImage(goo3,220,230,30,30);
        ctx.drawImage(goo1,300,250,30,30);
        ctx.drawImage(goo2,250,400,30,30);
        ctx.drawImage(goo3,350,300,30,30);
        ctx.drawImage(goo1,50,350,30,30);
        ctx.drawImage(goo2,100,380,30,30);
        ctx.drawImage(goo3,20,420,30,30);
        break;
    }
  }
  frameloop(){
    if(this.loop == false&&this.index <= this.count) {
      this.index++;
    }
    if(this.index > this.count){
      this.loop = true;
    }
    if(this.loop == true){
      this.index --;
      if(this.index <= 0){
        this.loop = false;
      }
    }
  }
}
