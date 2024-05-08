import { Router } from 'express';
const router = Router();
import * as deviceController from "../controller/device.controller.js";

router.get ("/", (req, res) => {
    res.send("<h1>Dashboard</h1>");
});

router.get ("/control", async (req, res) => {
    let result;
    try{
        if (!req.query.type || !req.query.value){
            throw ('Invalid query parameters')
        }
        result = await deviceController.deviceControl (req.query.type, req.query.value);
    } catch (error){
        console.log (error);
        res.send (error)
    }
    res.send(result); 
});

router.get ("/getSensorData", async (req, res) => {
    if (!req.query.type){
        res.send ('Invalid query parameters');
        return;
    }
    try{
    res.send(await deviceController.getSensorData (req.query.type));
    }
    catch (error){
        console.log (error);
    }
}
);

router.get ("/getHistorySensor", async (req, res) => {
    if (!req.query.type){
        res.send ('Invalid query parameters');
        return;
    }
    try{
        res.send(await deviceController.getHistorySensor (req.query.type));
    }
    catch (error){
        console.log (error);
        res.send (error)
    }
    }
);

router.get ("/getHistoryLog", async (req, res) => {
    res.send(await deviceController.getHistoryActivity ());
});

export default router;