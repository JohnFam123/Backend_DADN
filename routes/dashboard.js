import { Router } from 'express';
const router = Router();
import * as deviceController from "../controller/device.controller.js";

router.get ("/", (req, res) => {
    res.send("<h1>Dashboard</h1>");
});

router.get ("/control", async (req, res) => {
    let result;
    try{
        result = await deviceController.deviceControl (req.query.type, req.query.value);
    } catch (error){
        console.log (error);
        res.send (error)
    }
    res.send(result); 
});

router.get ("/getSensorData", async (req, res) => {
    res.send(await deviceController.getSensorData (req.query.type));
    }
);

router.get ("/getHistorySensor", async (req, res) => {
    res.send(await deviceController.getHistorySensor (req.query.type));
    }
);

router.get ("/getHistoryLog", async (req, res) => {
    res.send(await deviceController.getHistoryActivity ());
});

export default router;