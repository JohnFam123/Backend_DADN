import Script from '../model/script.model.js';
import schedule from 'node-schedule';

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
async function disableScript (username, scriptname){
    try{
        const script = await Script.findOne({ 'username': username, 'scriptname': scriptname });
        if (!script) {
            console.log("Script not found");
            return "Script not found";
        }
        script.status = 0;
        await script.save();
        console.log("Script disabled successfully.");
        return "Script disabled successfully.";
    }
    catch (error) {
        console.error("Error disabling script:", error);
        return "Error disabling script.";
    }
}

async function loadScript (username){
    try {
        const scripts = await Script.find({ 'username': username });
        scripts.forEach(async script => {
            console.log(script);
            console.log (await doSingleScript(script));
        });
        return scripts;
    } catch (error) {
        console.error("Error loading script:", error);
    }
}


async function doSingleScript (script){
    try{
        let type = script.scriptType;
        switch (type){
            case "time-based":
                return await timeBasedScriptControl(script);
            case "sensor-based":
                return await sensorBasedScriptControl(script);
            default:

                return "Invalid script type";
        }
    }
    catch (error) {
        console.error("Error executing script:", error);
    }
}

async function timeBasedScriptControl (script){
    try{
        let trigger = script.trigger;
        let value = script.value;

        let hour = Math.floor(value/3600);
        let minute = math.floor (value/60);
        let second = value%60;

        let jobrule = new schedule.RecurrenceRule();
        jobrule.hour = hour
        jobrule.minute = minute
        jobrule.second = second
        //schedule.scheduleJob(jobrule,)
    }
    catch (error) {
        console.error("Error executing time-based script:", error);
    }
}

async function sensorBasedScriptControl (script){
    try {
        const jobName = script.scriptname + script.username;
        
    }
    catch (error){
        console.error("Error executing sensor-based script:", error);
        return "Error executing sensor-based script.";
    }
}
    


export {
    createScript,
    loadScript,
    deleteScript,
    disableScript
}