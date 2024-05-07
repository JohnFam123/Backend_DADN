import Script from '../model/script.model.js';

async function createScript(name, deviceName, scriptType, sensorType, value, timeRecurrence, afterValue, status=1) {
    saveScriptLog(name, deviceName, scriptType, sensorType, value, timeRecurrence, afterValue, status);
}

async function saveScriptLog (name, deviceName, scriptType, sensorType, value, timeRecurrence, afterValue, status=1){
    try{
        const newScript = new Script({
            username: username,
            scriptname: name,
            deviceName: deviceName,
            scriptType: scriptType,
            sensorType: sensorType,
            value: value,
            timeRecurrence: timeRecurrence,
            afterValue: afterValue,
            status: status,
        });
        await newScript.save();
        console.log("Script created successfully.");
    }
    catch (error) {
        console.error("Error creating script:", error);
    }
}

async function loadScript (name){
    try {
        const script = await Script.findOne({ 'scriptname': name });
        return script;
    } catch (error) {
        console.error("Error loading script:", error);
    }
}

export {
    createScript,
    loadScript
}