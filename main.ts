/**
 * get radio group module
 */
//% color=#1eb0f0 icon="\uf0ad" block="getRadioGroup"
namespace getradiogroup {
    let RecievedString:string;
    /**
      * get radio group
      * @param toValue Time out value, eg: 10000
      */
    //% blockId=getRadioGroup block="get radio group %to"
    export function getRadioGroup(toValue: number): number {
            let radioGroup = 0;
            let recievedStrings:string[];

            radio.setGroup(0);
            radio.setTransmitPower(0);

            let startTime = input.runningTime()

            while (input.runningTime() < startTime + toValue && radioGroup == 0) {
                RecievedString = radio.receiveString();
                if (RecievedString != "" /*&& radio.receivedPacket(RadioPacketProperty.SignalStrength) >= -70*/) {
                    recievedStrings = split.split(RecievedString)
                    if (recievedStrings[0] == "CQ") {
                        radio.sendString(recievedStrings[1] + "," + control.deviceName() + "," + convertToText(Math.randomRange(10, 99)))
                    } else if (recievedStrings[0] == control.deviceName()) {
                        radioGroup = parseFloat(recievedStrings[2])
                        radio.sendString(recievedStrings[1] + "," + control.deviceName() + "," + convertToText(recievedStrings[2]))
                    }
                }
                basic.pause(Math.randomRange(50, 1000))
                if (radioGroup == 0) {
                    radio.sendString("CQ," + control.deviceName())
                }
            }
            radio.setGroup(radioGroup);
            return radioGroup
        }
    }
