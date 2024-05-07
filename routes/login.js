import { Router } from 'express';
const router = Router();
import * as userController from "../controller/user.controller.js";
import User from '../model/user.model.js';
import connectDB from '../controller/database.controller.js';
import { default as mongoose} from 'mongoose';
import { deviceControl } from '../controller/device.controller.js';


router.get ("/", (req, res) => {
    res.send("<h1>Login Page Yeah!!!</h1>");
});

router.post ("/createUser", async (req, res) => {
    try {
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        const user = await User.findOne({ 'username': username }).maxTimeMS(25000);
        if (user) {
            console.log("User already exists");
            res.send ('User already exists');
            return;
        }
        
        res.send(await userController.userCreate (username, name, email, password));
    }
    catch (err){
        console.log ("Error creating user, ", err);
        res.send("Error creating user");
    }
});
router.post ("/loginUser", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userController.userLogin(username, password);
    switch (result) {
        case 'Invalid password':
            res.send('Invalid password');
            break;
        case 'User not found':
            res.send('User not found');
            break;
        case 'Error login user':
            res.send('Error login user');
            break;
        default:
            res.status (200)
               .json ({
                success: true,
                     data: {
                            username: username,
                            token: result
                     }
    })}
});

router.post ("/openDoor", async (req, res) => {
    let value = req.body.value;
    try{
        return await deviceControl ('dooropen', value);
    }
    catch {
        console.log (error);
    }
});

router.post ("/changeDoorPass", async (req, res) => {
    let value = req.body.value;
    try{
        return await deviceControl ('doorchangepass', value);
    }
    catch {
        console.log (error);
    }
});
export default router;