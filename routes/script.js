import { Router } from 'express';
const router = Router();
import * as ScriptController from "../controller/script.controller.js";
import jwt from 'jsonwebtoken';


router.get ("/", async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secretkey');
    const username = decoded.username;
    let result = "test";
  
    result = await ScriptController.loadScript(username);
    res.send(result);
});

router.get ("/create", async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secretkey');
    const username = decoded.username;
    //createScript(name, deviceName, scriptType, sensorType, value, timeRecurrence, afterValue, status=1)
    const scriptName = req.body.scriptName;
    const deviceName = req.body.deviceName;
    const scriptType = req.body.scriptType;
    const sensorType = req.body.sensorType;
    const value = req.body.value;
    const trigger = req.body.trigger;
    const afterValue = req.body.afterValue;

    let result = "test";
  
    result = await ScriptController.createScript(username, scriptName, deviceName, scriptType, sensorType, value, trigger, afterValue);
    res.send(result);
}
);

router.get ("/delete", async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secretkey');
    const username = decoded.username;
    const scriptName = req.body.scriptName;
    let result = "test";
    
    try {
        result = await ScriptController.deleteScript(username, scriptName);
    }
    catch (error){
        result = "error deleting script";
    }
    res.send(result);
});

router.get ("/disable", async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secretkey');
    const username = decoded.username;
    const scriptName = req.body.scriptName;


    try {
        return await ScriptController.disableScript(username, scriptName);
    }
    catch {
        console.log (error);
        return "error disabling script";
    }
    });


export default router;