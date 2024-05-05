import mongoose from "mongoose";

const LogSchema = mongoose.Schema({
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
    deviceName: String,
    sensorType: String,
    value: Number,
});

const Log = mongoose.model('Log', LogSchema);

// Define a separate function for logging
async function logData(name, sensorType, value) {
    try {
        const newLog = new Log({
            deviceName: name,
            sensorType: sensorType,
            value: value,
        });
        await newLog.save();
        console.log("Log saved successfully.");
    } catch (error) {
        console.error("Error saving log:", error);
    }
}

export { Log, logData };
