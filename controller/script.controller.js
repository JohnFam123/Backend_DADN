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
async function deleteScript (username, scriptname){
    try{
        const script = await Script.findOne({ 'username': username, 'scriptname': scriptname });
        if (!script) {
            console.log("Script not found");
            return "Script not found";
        }
        await script.deleteOne();
        console.log("Script deleted successfully.");
        return "Script deleted successfully.";
    }
    catch (error) {
        console.error("Error deleting script:", error);
        return "Error deleting script.";
    }
}
async function loadScript (username){
    try {
        const scripts = await Script.find({ 'username': username });
        scripts.forEach(script => {
            console.log(script);
            doSingleScript(script);
        });
        return scripts;
    } catch (error) {
        console.error("Error loading script:", error);
    }
}


async function doSingleScript (script){
    try{
        
    }
    catch (error) {
        console.error("Error executing script:", error);
    }

}
    


export {
    createScript,
    loadScript,
    deleteScript
}