
export enum KeyCode {
    Control_L = 17
}

export function useKeyEvent(key: KeyCode, fn: () => void, upFn: () => void) {

    document.onkeydown = function (e: KeyboardEvent) {
        const event = e || window.event || arguments.callee.caller.arguments[0]
        if (event) {
            if (event.keyCode === key) {
                fn()
            }
            this.onkeyup = function () {
                upFn()
            }
        }
    }

}