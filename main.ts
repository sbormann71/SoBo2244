input.onButtonPressed(Button.A, function () {
    Ausgang = Ausgang * 2
    if (Ausgang > 8) {
        Ausgang = 1
        basic.setLedColor(0xff0000)
    } else {
        basic.setLedColor(0x00ff00)
    }
    pins.i2cWriteNumber(
    39,
    Ausgang + 112,
    NumberFormat.UInt8LE,
    false
    )
})
let AltAk = false
let AltEk2 = false
let Ereignis = 0
let AltEK1 = false
let GelesenAK = false
let GelesenEK2 = false
let GelesenEK1 = false
let gelesen = 0
let Ausgang = 0
Ausgang = 1
basic.forever(function () {
    gelesen = pins.i2cReadNumber(39, NumberFormat.UInt8LE, false)
    GelesenEK1 = !(BitwiseLogic.isBitSet(4, gelesen))
    GelesenEK2 = !(BitwiseLogic.isBitSet(5, gelesen))
    GelesenAK = !(BitwiseLogic.isBitSet(6, gelesen))
    if (!(AltEK1) && GelesenEK1) {
        Ereignis = 1
    }
    if (!(AltEk2) && GelesenEK2) {
        Ereignis = 2
    }
    if (AltAk && !(GelesenAK)) {
        Ereignis = 3
    }
    AltEK1 = GelesenEK1
    AltEk2 = GelesenEK2
    AltAk = GelesenAK
    basic.showString("" + (Ereignis))
    basic.pause(10)
})
