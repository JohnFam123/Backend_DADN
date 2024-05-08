import Script from '../model/script.model.js';

async function createScript(username, scriptName, deviceName, scriptType, sensorType, value, trigger, afterValue, status=1) {
    return await saveScriptLog(username,scriptName, deviceName, scriptType, sensorType, value, trigger, afterValue, status);
}

async function saveScriptLog (username, scriptname, deviceName, scriptType, sensorType, value, trigger, afterValue, status){
    try{
        try{
            const script = await Script.findOne({ 'username': username, 'scriptname': scriptname });
            if (script) {
                console.log("Script already exists");
                return "Script already exists";
            }

        }
        catch (error) {
            console.error("Error checking script:", error);
            return "Error creating script.";
        }
        const newScript = new Script({
            username: username,
            scriptname: scriptname,
            deviceName: deviceName,
            scriptType: scriptType,
            sensorType: sensorType,
            value: value,
            trigger: trigger,
            afterValue: afterValue,
            status: status,
        });
        await newScript.save();
        console.log("Script created successfully.");
        return "Script created successfully.";
    }
    catch (error) {
        console.error("Error creating script:", error);
        return "Error creating script.";
    }
}

async function loadScript (username){
    try {
        const script = await Script.find({ 'username': username });
        return script;
    } catch (error) {
        console.error("Error loading script:", error);
    }
}

async function doSingleScript (username, scriptname){
    let script;
    try {
        script = await Script.findOne({ 'username': username, 'scriptname': scriptname });
    }
        catch {
        console.error("Error loading script:", error);
    }
    
}
    


export {
    createScript,
    loadScript
}