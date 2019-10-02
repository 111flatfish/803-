import Animation from '../base/animation'
import DataBus   from '../databus'

let databus = new DataBus()

export default class Answer{
    constructor() {
        this.answer = [
            {text:"1",lock:false},
            {text:"2",lock:false},
            {text:"3",lock:false},
            {text:"4",lock:false},
            {text:"5",lock:false},
            {text:"6",lock:false},
            {text:"7",lock:false},
            {text:"8",lock:false},
            {text:"9",lock:false},
            {text:"10",lock:false},
            {text:"11",lock:false},
            {text:"12",lock:false},
            {text:"13",lock:false},
            {text:"14",lock:false},
            {text:"15",lock:false},
            {text:"16",lock:false},
            {text:"17",lock:false},
            {text:"18",lock:false},
            {text:"19",lock:false},
            {text:"20",lock:false}
        ];
    }

    // 每一帧更新位置
    update() {
        this.y -= this[__.speed]

        // 对象回收
        if ( this.y < 140 )
            databus.removeBooloon(this)
    }
}
