const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const BG_WIDTH = 512
const BG_HEIGHT = 750
let atlas = wx.createImage();
let bg = wx.createImage();
atlas.src = 'images/Common.png'
bg.src = "images/bg.jpg"
export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      score,
      10,
      30
    )
  }
//结束游戏
  renderGameOver(ctx, score, personalHighScore) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    if (personalHighScore) {
      ctx.fillText(
        '最高分: ' + personalHighScore,
        screenWidth / 2 - 40,
        screenHeight / 2 - 100 + 160
      )
    }
    
     const image = wx.createImage()
    image.src = 'images/bg.jpg'
    image.onload = function () {
      ctx.drawImage(image, 0, 0)
    }

      // ctx.drawImage(
      //   atlas,
      //   120, 6, 39, 24,
      //   screenWidth / 2 - 60,
      //   screenHeight / 2 - 100 + 180,
      //   120, 40
      // )
    
      
    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }

//开始游戏
  renderGameStart(ctx){
  
    const image = wx.createImage()
    image.src = 'images/bg.jpg'
   
    atlas.onload = function () {
      
    }
    image.onload = function () {
      ctx.drawImage(image, 0, 0,BG_WIDTH,BG_HEIGHT);
      ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300);
      ctx.fillStyle = "#ffffff"
      ctx.font = "20px Arial"
      ctx.drawImage(
        atlas,
        120, 6, 39, 24,
        screenWidth / 2 - 60,
        screenHeight / 2 - 100 + 180,
        120, 40
      );
      ctx.drawImage(
        atlas,
        120, 6, 39, 24,
        screenWidth / 2 - 120,
        screenHeight / 2 - 190 + 205,
        120, 40
      );
      ctx.drawImage(
        atlas,
        120, 6, 39, 24,
        screenWidth / 2 + 10,
        screenHeight / 2 - 190 + 205,
        120, 40
      )
      ctx.fillText(
        '大家来垃圾',
        screenWidth / 2 - 40,
        screenHeight / 2 - 100 + 50
      );
      ctx.fillText(
        '简单',
        screenWidth / 2 - 80,
        screenHeight / 2 - 160 + 205
      )
      ctx.fillText(
        '困难',
        screenWidth / 2 + 40,
        screenHeight / 2 - 160 + 205
      )
      ctx.fillText(
        '游戏开始',
        screenWidth / 2 - 40,
        screenHeight / 2 - 100 + 205
      )
    }

    this.btnModeArea1 = {
      startX: screenWidth / 2 - 80,
      startY: screenHeight / 2 - 160 + 185,
      endX: screenWidth / 2 + 40,
      endY: screenHeight / 2 - 100 + 145
    };
    this.btnModeArea2 = {
      startX: screenWidth / 2 + 40,
      startY: screenHeight / 2 - 160 + 185,
      endX: screenWidth / 2 + 160,
      endY: screenHeight / 2 - 100 + 145
    }
    this.btnStartArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 100 + 255
    }
  }
}

