import Animation from '../base/animation'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight


let databus = new DataBus()


export default class Problems {
    constructor(ctx) {
        this.initbackground(ctx);
        this.initproblem(ctx);
    }


    // 问题板块背景
    initbackground(ctx){
        ctx.fillStyle = "#ef4238"
        ctx.fillRect(screenWidth/2 -225,70,450,50);
    }

    initproblem(ctx,text){
        ctx.fillStyle = "#ffffff"
        ctx.font    = "20px Arial"

        ctx.fillText(
            text?text:"问题1：垃圾是什么？",
            screenWidth / 2 -150,
            100
        )
    }

    // 每更新问题
    update(ctx,text) {
        this.initproblem(ctx,text);
    }

    drawToCanvas(ctx) {
        this.initbackground(ctx);
        this.initproblem(ctx);

        // ctx.drawImage(
        //     this.img,
        //     this.x,
        //     this.y,
        //     this.width,
        //     this.height
        // )
    }
}
