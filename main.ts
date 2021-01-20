let gelesen = 0
input.onButtonPressed(Button.A, function () {
    pins.i2cWriteNumber(
    39,
    254,
    NumberFormat.UInt8LE,
    false
    )
})
input.onButtonPressed(Button.B, function () {
    pins.i2cWriteNumber(
    39,
    255,
    NumberFormat.UInt8LE,
    false
    )
})
basic.forever(function () {
    gelesen = pins.i2cReadNumber(39, NumberFormat.UInt8LE, false)
    gelesen = BitwiseLogic.bitwise2arg(gelesen, operator.and, 2)
    basic.showString("" + (gelesen))
    basic.pause(BitwiseLogic.bitwise2arg(0, operator.and, 0))
})
