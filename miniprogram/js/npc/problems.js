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
        this.problem = [
            {text:"垃圾是什么？",an:"1",num:0},
            {text:"怎么获得垃圾？",an:"5",num:1},
            {text:"怎么分类？",an:"10",num:2},
            {text:"分类的类别？",an:"15",num:3},
            {text:"垃圾的价值？",an:"20",num:4}
        ];
        this.currentproblem = this.problem[0];
        this.initbackground(ctx);
        this.initproblem(ctx,this.currentproblem.text);
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
    update(ctx) {
        this.initproblem(ctx,"问题"+(this.currentproblem.num +1)+":"+this.currentproblem.text);
    }

    drawToCanvas(ctx) {
        this.initbackground(ctx);
        this.initproblem(ctx,"问题"+(this.currentproblem.num+1)+":"+this.currentproblem.text);

        // ctx.drawImage(
        //     this.img,
        //     this.x,
        //     this.y,
        //     this.width,
        //     this.height
        // )
    }
}
