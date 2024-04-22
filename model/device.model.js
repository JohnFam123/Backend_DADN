import connectDB from "../controller/database.controller.js";
import { default as mongoose} from 'mongoose'
const deviceSchema = new mongoose.Schema({
    name: String, 
    type: String,
    category: String,
    status: Boolean,
});

const Sensor = mongoose.model('Device', deviceSchema);
export default Sensor;