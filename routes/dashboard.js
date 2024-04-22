import { Router } from 'express';
const router = Router();
import { getSensorData, deviceControl } from "../controller/device.controller.js";

router.get ("/", (req, res) => {
    res.send("<h1>Dashboard</h1>");
});

router.get ("/control", async (req, res) => {
    //console.log(req.query);
    res.send(await deviceControl (req.query.type, req.query.value)); 
});

router.get ("/getSensorData", async (req, res) => {
    res.send(getSensorData (req.query.type));
    }
);

export default router;