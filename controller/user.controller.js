import User from "../model/user.model.js";
import connectDB from "./database.controller.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;
const connection = connectDB();

async function userVerify (username, sessionID){
}

async function userLogin (username, password){
    try {
        const user = await User.findOne({ 'username': username });
        if (user) {
            const match = bcrypt.compare(password, user.password);
            if (match) {
                console.log ("User logged in");
                const token = await new Promise ((resolve, reject) => {
                    jwt.sign({username: user.username},'secretkey', {expiresIn: '1h'}, (err, token) => {
                        if (err) reject(err);
                        resolve(token);
                    });
            });
            return token;
            }
            else {
                console.log("Invalid password");
                return 'Invalid password';
            }
        } else {
          console.log("User not found");
          return 'User not found';
        }
      } catch (err) {
        console.error(err);
        return 'Error login user';
      }
}
async function userCreate (username,name, email, password){
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    try {
        const user = new User({
            username: username,
            name: name,
            email: email,
            password: hashedPassword
        });
        user.save();
        console.log("User created");
        return "User created";
    } catch (err) {
        console.error(err);
        return "Error creating user";
    }

}

export {
    userVerify,
    userLogin,
    userCreate
}
