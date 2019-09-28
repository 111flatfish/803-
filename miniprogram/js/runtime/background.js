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
    this.river.src = "images/river.jpg";
    this.rubbish.src = "images/rubbish.png";
    this.bin.src = "images/bin.jpg";
    this.top = 0
    this.render(ctx)
  }

  // update() {
  //   this.top += 2

  //   if ( this.top >= screenHeight )
  //     this.top = 0
  // }

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
      ctx.drawImage(
        this.river,
        50,
        0,
        50,
        50
      );

    ctx.fillStyle="#FF0000";
    ctx.beginPath();
    for(let i = 0 ;i < 3;i++){
      ctx.arc(70,22,15,0,Math.PI*2,true);
    }


    ctx.closePath();
    ctx.fill();
    ctx.drawImage(
      this.rubbish,
      180,
      0,
      50,
      50
    );
    ctx.drawImage(
      this.bin,
      300,
      0,
      50,
      50
    );
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
}
