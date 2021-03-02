function Einschalten (Einschaltseite: number) {
    Ampel(1)
    basic.pause(2000)
    Ampel(2)
    basic.pause(1000)
    while (3 != Ereignis) {
        Ueberwachungssignal(Einschaltseite, true)
        basic.pause(700)
        Ueberwachungssignal(Einschaltseite, false)
        basic.pause(700)
    }
    Ereignis = 0
    basic.pause(1500)
    Ampel(3)
}
function Ueberwachungssignal (seite: number, an: boolean) {
    if (seite == 1) {
        Ausgang = BitwiseLogic.bitwise2arg(Ausgang, operator.and, 255 - 4)
        if (an) {
            Ausgang = BitwiseLogic.bitwise2arg(4, operator.or, Ausgang)
        }
    } else if (seite == 2) {
        Ausgang = BitwiseLogic.bitwise2arg(Ausgang, operator.and, 255 - 8)
        if (an) {
            Ausgang = BitwiseLogic.bitwise2arg(8, operator.or, Ausgang)
        }
    }
    pins.i2cWriteNumber(
    39,
    Ausgang + 112,
    NumberFormat.UInt8LE,
    false
    )
}
function Ampel (dumm: number) {
    Ausgang = BitwiseLogic.bitwise2arg(dumm, operator.or, BitwiseLogic.bitwise2arg(Ausgang, operator.and, 252))
    pins.i2cWriteNumber(
    39,
    Ausgang + 112,
    NumberFormat.UInt8LE,
    false
    )
}
let AltAk = false
let AltEk2 = false
let AltEK1 = false
let GelesenAK = false
let GelesenEK2 = false
let GelesenEK1 = false
let gelesen = 0
let Ereignis = 0
let Ausgang = 0
Ampel(3)
Ueberwachungssignal(1, false)
Ueberwachungssignal(2, false)
Ausgang = 112
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
basic.forever(function () {
    if (1 == Ereignis) {
        Ereignis = 0
        Einschalten(1)
    } else if (2 == Ereignis) {
        Ereignis = 0
        Einschalten(2)
    } else {
        Ereignis = 0
    }
})
