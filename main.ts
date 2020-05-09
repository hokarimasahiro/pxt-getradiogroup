/**
 * get radio group module
 */
//% color=#1eb0f0 icon="\uf0ad" block="getRadioGroup"
namespace getradiogroup {
    let radioGroup=0;
    let rGroup=0,sGroup=0;
    let startTime=0;
    let toTime=0;
    /**
      * init radio group
      */
    //% blockId=init block="init radio group"
    export function init():void {
        startTime=input.runningTime();
        toTime = startTime + Math.randomRange(10, 50);
        radioGroup = 0;
        radio.setGroup(radioGroup)
        radio.setTransmitPower(0)
    }
    /**
      * get radio group
      * @param to Time out value [mS], eg: 10000
      */
    //% blockId=getRadioGroup block="get radio group %to"
    function getRadioGroup(rData: string):number {
        if (radioGroup == 0 && input.runningTime() > toTime) {
            radio.sendString("CQ," + control.deviceName())
            toTime = startTime + Math.randomRange(1000, 1050);
        }
        if (rData != "") {
            let rStrings = split.split(rData)
            if (rStrings[0] == "CQ") {
                sGroup = Math.randomRange(10, 99)
                radio.sendString("" + rStrings[1] + "," + control.deviceName() + "," + convertToText(sGroup))
            } else if (rStrings[0] == control.deviceName()) {
                rGroup = parseFloat(rStrings[2])
                radio.sendString("" + rStrings[1] + "," + control.deviceName() + "," + convertToText(rGroup))
                radioGroup=rGroup;
                radio.setGroup(radioGroup)
           }
        }
        return (radioGroup);
    }
}