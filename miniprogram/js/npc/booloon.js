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

//气球出现的随机位置
function rnd(start, end){
    return Math.floor(Math.random() * (end - start) + start)
}

export default class Booloon extends Animation {
    constructor(text) {
        super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
        this.text = text;
        this.initExplosionAnimation()
    }

    init(speed) {
        this.x = rnd(0, window.innerWidth - ENEMY_WIDTH);
        this.y = screenHeight - 120;

        this[__.speed] = speed

        this.visible = true
    }

    // 预定义爆炸的帧动画
    initExplosionAnimation() {
        let frames = []

        const EXPLO_IMG_PREFIX  = 'images/explosion'
        const EXPLO_FRAME_COUNT = 19

        for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
            frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
        }

        this.initFrames(frames)
    }

    // 每一帧更新位置
    update(ctx) {
        this.y -= this[__.speed]

        // 对象回收
        if ( this.y < 140 )
            databus.removeBooloon(this)
    }
    drawAnswer(ctx,text){
        ctx.fillStyle = "#ffffff"
        ctx.font    = "14px Arial"

        ctx.fillText(
            this.text?this.text:"答案",
            this.x + 20,
            this.y + 20
        )
    }
}
