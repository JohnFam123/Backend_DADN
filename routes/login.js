import { Router } from 'express';
const router = Router();
import { deviceControl } from "../controller/device.controller.js";

router.get ("/", (req, res) => {
    res.send("<h1>Dashboard</h1>");
});

router.get ("/control", (req, res) => {
    //console.log(req.query);
    deviceControl (req.query.type, req.query.value); 
});

export default router;