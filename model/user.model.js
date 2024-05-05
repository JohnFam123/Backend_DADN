import connectDB from "../controller/database.controller.js";
import { default as mongoose} from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);


export default User;
