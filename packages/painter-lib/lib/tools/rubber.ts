import { COLORS_CONTAINER_ID } from './../utils/consts';
import rubber from "/assets/rubber.svg";
import pencil from "/assets/pencil.svg";
import styl from "./rubber.module.css";
import { KeyCode, useKeyEvent } from "../utils/index";

type Cursor = 'pencil' | 'rubber'

let currentCursor: Cursor = 'pencil'

function getCurrentColor() {
    const ul = document.getElementById(COLORS_CONTAINER_ID) as HTMLUListElement
    const current = ul.querySelector('li.selected') as HTMLLIElement
    return current.style.background || '#333'
}

function drawEraser(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
) {
    const size = 20
    const xx = x - size / 2
    const yy = y - size / 2
    ctx.fillRect(xx, yy, size, size);
    ctx.strokeRect(xx, yy, size, size)
    ctx.clearRect(xx, yy, size, size);
}

function genLineStyle(
    ctx: CanvasRenderingContext2D,
    cursor?: Cursor
) {
    if (cursor === 'rubber') {
        ctx.strokeStyle = "#fff";
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = "#7f8c8d";
        return
    }
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = getCurrentColor();
}

function genPencilStyl(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
) {
    canvas.classList.remove(styl.rubberCursor)
    canvas.classList.add(styl.pencilCursor)

    currentCursor = 'pencil'


    genLineStyle(ctx, 'pencil')
}

function genRubberStyl(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
) {
    canvas.classList.remove(styl.pencilCursor)
    canvas.classList.add(styl.rubberCursor)
    currentCursor = 'rubber'

    genLineStyle(ctx, 'rubber')
}

export default function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const btn = document.createElement('img')
    btn.className = styl.btn
    btn.width = 25
    btn.height = 25
    btn.src = pencil
    canvas.classList.add(styl.pencilCursor)
    currentCursor = 'pencil'

    genLineStyle(ctx)

    canvas.onmousedown = function () {
        canvas.onmousemove = function (e: MouseEvent) {
            if (currentCursor === 'rubber') {
                drawEraser(
                    ctx,
                    e.x,
                    e.y
                );
            }
        };
    };
    canvas.onmouseup = function () {
        canvas.onmousemove = null
    };

    useKeyEvent(KeyCode.Control_L, () => {
        // 切换橡皮擦
        genRubberStyl(ctx, canvas)
        btn.src = rubber
    }, () => {
        btn.src = pencil
        genPencilStyl(ctx, canvas)
    })

    btn.onclick = function () {
        // 切换橡皮擦
        if (currentCursor === 'pencil') {
            genRubberStyl(ctx, canvas)
            btn.src = rubber
        } else {
            btn.src = pencil
            genPencilStyl(ctx, canvas)
        }
    }
    document.documentElement.appendChild(btn)
}