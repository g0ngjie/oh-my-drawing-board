
import clear from "/assets/clear.svg";
import styl from "./clean.module.css";

export default function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const btn = document.createElement('img')
    btn.className = styl.btn
    btn.width = 25
    btn.height = 25
    btn.src = clear
    btn.onclick = function () {
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    document.documentElement.appendChild(btn)
}