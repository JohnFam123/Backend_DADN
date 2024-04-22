import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
    name: String, 
    type: String,
    category: String,
    status: Boolean,
});
sensorSchema.methods.toJSON = function() {
    return {
        name: this.name,
        type: this.type,
        category: this.category,
        status: this.status,
    };
};

const Device = mongoose.model('Sensor', sensorSchema);
export default Device;