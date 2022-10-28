import styl from "./colors.module.css";

export default function (ctx: CanvasRenderingContext2D) {
    const colorContainer = document.createElement("ul")

    colorContainer.className = styl.container

    const colorArray = [
        "#f52443",
        "#ffa502",
        "#f9e459",
        "#98bc67",
        "#79d2d2",
        "#91a7ff",
        "#9fa0d7",
        "#ff9393",
        "#f5eeeb",
        "#bdc3c7",
        "#95a5a6",
        "#7f8c8d",
        "#34495e",
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
        }
    }

    document.documentElement.appendChild(colorContainer)
}
