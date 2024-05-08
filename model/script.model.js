import {default as mongoose} from 'mongoose'; 

const scriptSchema = new mongoose.Schema({
    dateTime: {
        type: Date,
        default: function() {
            // Get the current time
            const currentTime = new Date();
            // Adjust the time to GMT+7 timezone
            const currentTimeGMT7 = new Date(currentTime.getTime() + (7 * 60 * 60 * 1000)); // Adding 7 hours for GMT+7
            return currentTimeGMT7;
        }
    },
    username: String,
    scriptname: String,
    deviceName: String,
    scriptType: String,
    sensorType: String,
    value: Number,// In seconds if script is time_based, value if script is sensor_based
    trigger: String,//None if script is not time_based
    afterValue: Number,
    status: Boolean,
});

const Script = mongoose.model ('Script', scriptSchema);

export default Script;