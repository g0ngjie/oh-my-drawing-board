import styl from "./index.module.css"
import {
    Colors as createColors,
    Clean as createClean,
    Rubber as createRubber,
} from "./tools/index";
import { isMobile } from "./utils/index";

export default function (container: HTMLElement) {

    const canvas = document.createElement("canvas")


    canvas.height = document.documentElement.clientHeight;
    canvas.width = document.documentElement.clientWidth;
    canvas.className = styl.container


    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let isDrawing = false;
    let last: number[];

    createColors(ctx)
    createClean(ctx, canvas)
    createRubber(ctx, canvas)

    if (isMobile) {
        canvas.ontouchstart = (e) => {
            last = [e.touches[0].clientX, e.touches[0].clientY];
        };
        canvas.ontouchmove = (e) => {
            drawLine(last[0], last[1], e.touches[0].clientX, e.touches[0].clientY);
            last = [e.touches[0].clientX, e.touches[0].clientY];
        };
    } else {
        canvas.onpointermove = (e: PointerEvent) => {
            ctx.lineWidth = getLineWidth(e);
            if (isDrawing) {
                drawLine(last[0], last[1], e.clientX, e.clientY);
                last = [e.clientX, e.clientY];
            }
        };
        canvas.onpointerdown = (e) => {
            isDrawing = true;
            last = [e.clientX, e.clientY];
        };
        canvas.onpointerup = () => {
            isDrawing = false;
        };
    }


    function drawLine(x1: number, y1: number, x2: number, y2: number) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function getLineWidth(e: PointerEvent) {
        switch (e.pointerType) {
            case "touch": {
                if (e.width < 10 && e.height < 10) {
                    return (e.width + e.height) * 2 + 10;
                } else {
                    return (e.width + e.height - 40) / 2;
                }
            }
            case "pen":
                return e.pressure * 8;
            default:
                return e.pressure ? e.pressure * 8 : 4;
        }
    }

    container.appendChild(canvas)
}