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
let gelesen = 0
let Ausgang = 0
Ausgang = 1
basic.forever(function () {
    gelesen = pins.i2cReadNumber(39, NumberFormat.UInt8LE, false)
    gelesen = BitwiseLogic.bitwise2arg(gelesen, operator.rightShift, 4)
    basic.showString("" + (BitwiseLogic.bitwise2arg(BitwiseLogic.bitwiseNot(gelesen), operator.and, 7)))
    basic.pause(1000)
})
