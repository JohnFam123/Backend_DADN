import mongoose from "mongoose";

const LogSchema = mongoose.Schema({
    dateTime: {
        type: Date,
        default: Date.now,
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
