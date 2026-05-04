enum State {
    Passive = 0,
    Started = 1,
    Running = 2,
}

let state: State = State.Passive
let waitTime: number

let pressedA: boolean
let pressedB: boolean

function hodiny() {
    basic.clearScreen()

    for (let y: number = 0; y < 5; y += 4)
    {for (let x: number = 0; x < 5; x += 1)
    {led.plot(x, y)}}

    led.plot(0, 1)
    led.plot(1, 2)
    led.plot(0, 3)

    led.plot(4, 1)
    led.plot(3, 2)
    led.plot(4, 3)

    led.plot(2, 2)

}

input.onLogoEvent(TouchButtonEvent.Touched, () => {
    if (state === State.Passive) {
        state = State.Started
        hodiny()
        waitTime = randint(3, 6)
        control.runInBackground(() => music.playTone(440, 200))
        basic.pause(waitTime * 1000)

        pressedA = input.buttonIsPressed(Button.A)
        pressedB = input.buttonIsPressed(Button.B)

        if (pressedA && pressedB) {
            basic.showIcon(IconNames.Sad)
            control.runInBackground(() => music.playTone(600, 230))
            state = State.Passive
        } else if (pressedA) {
            basic.showString('B')
            control.runInBackground(() => music.playTone(880, 180))
            state = State.Passive
        } else if (pressedB) {
            basic.showString('A')
            control.runInBackground(() => music.playTone(880, 180))
            state = State.Passive
        } else {
            state = State.Running
        }

        if (state === State.Running) {
            basic.showIcon(IconNames.Pitchfork)
            control.runInBackground(() => music.playTone(490, 240))

            while (true) {
                pressedA = input.buttonIsPressed(Button.A)
                pressedB = input.buttonIsPressed(Button.B)

                if (pressedA && pressedB) {
                    basic.showIcon(IconNames.Square)
                    control.runInBackground(() => music.playTone(880, 180))
                } else if (pressedA) {
                    basic.showString('A')
                    control.runInBackground(() => music.playTone(880, 180))
                } else if (pressedB) {
                    basic.showString('B')
                    control.runInBackground(() => music.playTone(880, 180))
                } else {
                    basic.pause(20)
                    continue
                }

                state = State.Passive
                break
            }
        }
    }
})