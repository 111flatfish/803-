import Player     from './player/index'
import Enemy      from './npc/enemy'
import Booloon    from "./npc/booloon"
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'
import Problems from  "./npc/problems"
const BG_IMG_SRC = './images/bg.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 750
let bac = new Image();
bac.src = BG_IMG_SRC;
let ctx   = canvas.getContext('2d')
let databus = new DataBus()

wx.cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  // env: 'my-env-id',
})
const db = wx.cloud.database()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0
    this.personalHighScore = null;
    this.hasStart = false;
    this.gameMode = true;
    this.gamestartinfo = new GameInfo();
    this.gamestartinfo.renderGameStart(ctx);
    this.problem = this.problemsGenerate();
    // const image = wx.createImage()
    // image.src = 'images/bg.jpg'
    // image.onload = function () {
    //   ctx.drawImage(image, 0, 0)
    // }
      if(!this.hasStart){
        this.hasStart = true;
        this.startHandler = this.startTouchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.startHandler)
      }
     

    // this.login()
  }

  login() {
    // 获取 openid
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        window.openid = res.result.openid
        this.prefetchHighScore()
      },
      fail: err => {
        console.error('get openid failed with error', err)
      }
    })
  }

  prefetchHighScore() {
    // 预取历史最高分
    db.collection('score').doc(`${window.openid}-score`).get()
      .then(res => {
        if (this.personalHighScore) {
          if (res.data.max > this.personalHighScore) {
            this.personalHighScore = res.data.max
          }
        } else {
          this.personalHighScore = res.data.max
        }
      })
      .catch(err => {
        console.error('db get score catch error', err)
        this.prefetchHighScoreFailed = true
      })
  }

  restart(gamemode) {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.startHandler
    );
    canvas.removeEventListener('touchover',this.touchHandler);

    this.bg       = new BackGround(ctx)
    this.player   = new Player(ctx)
    this.gameinfo = new GameInfo()
    this.music    = new Music()
    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    );
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if ( databus.frame % 30 === 0 ) {
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(6)
      databus.enemys.push(enemy)
    }
  }
  problemsGenerate(){
      let problem = new Problems(ctx);
      return problem;
  }
  booloonGenerate(){
    if(databus.frame % 30 === 0){
    let booloon = databus.pool.getItemByClass("booloon",Booloon);
    booloon.init(2);
    databus.booloons.push(booloon);
    }
  }
  // 全局碰撞检测
  collisionDetection() {
    let that = this
    databus.bullets.forEach((bullet) => {
      for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
        let enemy = databus.enemys[i]

        if ( !enemy.isPlaying && enemy.isCollideWith(bullet) ) {
          enemy.playAnimation()
          that.music.playExplosion()

          bullet.visible = false
          databus.score  += 1

          break
        }
      }
    })

    for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
      let enemy = databus.enemys[i]

      if ( this.player.isCollideWith(enemy) ) {
        databus.gameOver = true

        // 获取历史高分
        if (this.personalHighScore) {
          if (databus.score > this.personalHighScore) {
            this.personalHighScore = databus.score
          }
        }

        // 上传结果
        // 调用 uploadScore 云函数
        wx.cloud.callFunction({
          name: 'uploadScore',
          // data 字段的值为传入云函数的第一个参数 event
          data: {
            score: databus.score
          },
          success: res => {
            if (this.prefetchHighScoreFailed) {
              this.prefetchHighScore()
            }
          },
          fail: err => {
            console.error('upload score failed', err)
          }
        })

        break
      }
    }
    // 检测气球与针的碰撞
    for ( let i = 0, il = databus.booloons.length; i < il;i++ ) {
      let booloon = databus.booloons[i]

      if ( this.player.isCollideWith(booloon) ) {
        databus.gameOver = true

        // 获取历史高分
        if (this.personalHighScore) {
          if (databus.score > this.personalHighScore) {
            this.personalHighScore = databus.score
          }
        }

        // 上传结果
        // 调用 uploadScore 云函数
        wx.cloud.callFunction({
          name: 'uploadScore',
          // data 字段的值为传入云函数的第一个参数 event
          data: {
            score: databus.score
          },
          success: res => {
            if (this.prefetchHighScoreFailed) {
              this.prefetchHighScore()
            }
          },
          fail: err => {
            console.error('upload score failed', err)
          }
        })

        break
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
  }
  //开始菜单按钮+模式
  startTouchEventHandler(e){
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      // 开始按钮
    let area = this.gamestartinfo.btnStartArea;
    // 模式按钮
    let area2 =this.gamestartinfo.btnModeArea1;
    let area3 = this.gamestartinfo.btnModeArea2;
    if (x >= area2.startX
      && x <= area2.endX
      && y >= area2.startY
      && y <= area2.endY) {
      console.log("简单");
      // this.restart();
      this.gameMode = true;
    }
    else if (x >= area3.startX
      && x <= area3.endX
      && y >= area3.startY
      && y <= area3.endY) {
      console.log("困难");
      this.gameMode = false;
      // this.restart();
    }
    else if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY){
        console.log("开始");
        this.restart(this.gameMode);

      }
      // this.restart()}
    // this.removeEventListener("touchstart",this.startHandler);
  }
 
  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    databus.booloons
          .forEach((item) => {
              item.drawToCanvas(ctx);
              item.drawAnswer(ctx)
            })

    this.player.drawToCanvas(ctx);

    this.problem.drawToCanvas(ctx);

    databus.animations.forEach((ani) => {
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(
        ctx, 
        databus.score,
        this.personalHighScore
      )

      if ( !this.hasEventBind ) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchover', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver )
      return;

    // this.bg.update()

    // databus.bullets
    //        .concat(databus.enemys)
    //        .forEach((item) => {
    //           item.update()
    //         })
        databus.booloons.forEach((item)=>{
          item.update(ctx);
        })
    // 敌机出现
    // this.enemyGenerate()
    this.booloonGenerate();
    this.collisionDetection()
    this.problem.update(ctx,"问题");
    // 子弹出现
    // if ( databus.frame % 20 === 0 ) {
    //   this.player.shoot()
    //   this.music.playShoot()
    // }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
