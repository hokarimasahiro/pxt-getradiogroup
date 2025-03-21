/**
 * get radio group module
 */
//% color=#1eb0f0 icon="\uf0ad" block="getRadioGroup"
namespace getradiogroup {
    let radioGroup = 0;
    let rGroup = 0, sGroup = 0;
    let startTime = 0;
    let toTime = 0;
    let hostName = "";

    /**
      * init radio group
      */
    //% blockId="initRadioGroup" block="initRadioGroup"
    export function initRadioGroup() {
        startTime = input.runningTime();
        toTime = startTime + Math.randomRange(10, 50);
        radioGroup = 0
        radio.setGroup(radioGroup)
        radio.setTransmitPower(0)
    }
    /**
      * get radio group
      * @param rData Recieved Data, eg: "CQ,aaaa"
      */
    //% blockId="getRadioGroup" block="get radio group %rData"
    export function getRadioGroup(rData: string): number {
        if (rData != "" && radio.receivedPacket(RadioPacketProperty.SignalStrength) > -50) {
            let rStrings = rData.split(",")
            if (rStrings[0] == control.deviceName()) {
                hostName = rStrings[1]
                rGroup = parseFloat(rStrings[2])
                radio.sendString("" + hostName + "," + control.deviceName() + "," + convertToText(rGroup))
                radioGroup = rGroup;
                radio.setGroup(radioGroup)
            }
        } else if (radioGroup == 0 && input.runningTime() > toTime) {
            radio.sendString("CQ," + control.deviceName())
            toTime = input.runningTime() + Math.randomRange(1000, 1050);
        }
        return (radioGroup)
    }
    /**
      * get host name
      */
    //% blockId="getHostName" block="get host name"
    export function getHostName(): string {
        return (hostName)
    }
}