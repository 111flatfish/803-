import Animation from '../base/animation'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/booloon.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight
const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus()



export default class Answer{
    constructor(text) {



    }

    initanswer(text,ctx){
        ctx.fillStyle = "#ffffff"
        ctx.font    = "14px Arial"

        ctx.fillText(
            text?text:"答案",
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 50
        )
    }
    init(speed) {
        this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
        this.y = screenHeight - 120;

        this[__.speed] = speed

        this.visible = true
    }



    // 每一帧更新位置
    update() {
        this.y -= this[__.speed]

        // 对象回收
        if ( this.y < 140 )
            databus.removeBooloon(this)
    }
}
