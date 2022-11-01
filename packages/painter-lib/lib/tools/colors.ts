import { COLORS_CONTAINER_ID } from '../utils/consts';
import styl from "./colors.module.css";

export default function (ctx: CanvasRenderingContext2D, onCLickFn: () => void) {
    const colorContainer = document.createElement("ul")

    colorContainer.id = COLORS_CONTAINER_ID

    colorContainer.className = styl.container

    const colorArray = [
        "#333333",
        "#34495e",
        "#7f8c8d",
        "#f5eeeb",
        "#ff9393",
        "#9fa0d7",
        "#91a7ff",
        "#79d2d2",
        "#98bc67",
        "#f9e459",
        "#ffa502",
        "#f52443",
    ];

    for (let i = 0; i < colorArray.length; i++) {
        const li = document.createElement("li");

        if (i === 0) {
            li.classList.add("selected");
            li.style.cssText = `width: 25px; height: 25px;`
        }
        li.style.background = colorArray[i];
        colorContainer.appendChild(li);
    }

    // 改变画笔颜色
    colorContainer.onclick = function (e: MouseEvent) {
        if (e.target instanceof HTMLLIElement) {
            const prev = colorContainer.querySelector('li.selected') as HTMLLIElement
            prev.classList.remove("selected");
            prev.style.removeProperty('width')
            prev.style.removeProperty('height')
            const selected = e.target;

            selected.classList.add("selected");
            selected.style.width = '25px';
            selected.style.height = '25px';
            ctx.strokeStyle = selected.style.background;
            onCLickFn()
        }
    }

    document.documentElement.appendChild(colorContainer)
}
