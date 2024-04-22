import { default as mongoose} from 'mongoose'
import Sensor from '../model/device.model.js'
import Device from '../model/sensor.model.js'
import {Log, logData} from '../model/log.model.js'
import connectDB from './database.controller.js'
async function deviceControl (type, value) {
  //console.log ('Device control called with type:', type, 'and value:', value)
  let nameDevice = ""
  switch (type) {
    case 'light':
      nameDevice = "V10"
      break
    case 'fan':
      nameDevice = "V12"
      break
    default:
      throw ('Invalid device type')
  }
  return await publishDevice(nameDevice, value)
}
function getSensorData (type) {
  console.log ('Get sensor data called with type:', type)
  let result = ""
  switch (type) {
    case 'temp':
      result = sensorData.temp
      break
    case 'humidity':
      result = sensorData.humidity
      break
    case 'light':
      result = sensorData.light
      break
    default:
      throw ('Invalid sensor type')
  }
  return result.toString()
}

const connection = connectDB();
const sensorData = {
  temp: 0,
  humidity: 0,
  light: 0
}
//const Blog = mongoose.model(name, new mongoose.Schema({}));
//export 

import { connect } from "mqtt";
import cors from "cors";

const MQTT_SERVER = "mqtt.ohstem.vn";
const MQTT_PORT = 1883;
const MQTT_USERNAME = "Yolo:Home0410";
const MQTT_PASSWORD = "";
const MQTT_TOPIC_PUB = [
  `${MQTT_USERNAME}/feeds/V10`,
  `${MQTT_USERNAME}/feeds/V12`
  //`${MQTT_USERNAME}/feeds/V13`,
];
const MQTT_TOPIC_SUB = [
  `${MQTT_USERNAME}/feeds/V1`,
  `${MQTT_USERNAME}/feeds/V2`,
  `${MQTT_USERNAME}/feeds/V3`,
  `${MQTT_USERNAME}/feeds/V12`
];
const mqttClient = connect({
  host: MQTT_SERVER,
  port: MQTT_PORT,
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
});

mqttClient.on("connect", () => {
  console.log("Connected successfully!");
  MQTT_TOPIC_SUB.forEach((topic) => {
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error("Error subscribing to topic:", topic, err);
      } else {
        console.log("Subscribed to", topic);
      }
    });
  });
});
let on_message = 0;
mqttClient.on("message", (topic, message) => {
  var type
  switch (topic) {
    case `${MQTT_USERNAME}/feeds/V1`:
      type = "temp"
      sensorData.temp = parseFloat(message.toString());
      break;
    case `${MQTT_USERNAME}/feeds/V2`:
      type = "humidity"
      sensorData.humidity = parseFloat(message.toString());
      break;
    case `${MQTT_USERNAME}/feeds/V3`:
      type = "light"
      sensorData.light = parseFloat(message.toString());
      break;
      /* case `${MQTT_USERNAME}/feeds/V12`:
        type = "fan"
        sensorData.light = parseFloat(message.toString()); */
    default:
      break;
  }
  if (on_message == 0) {
    on_message = 1;
    return;
  }
  else{
  on_message = 0;
  console.log(`Received message ${message.toString()} on topic ${topic}`);
  console.log(sensorData);
  logData(topic,type,message)
  }
});

mqttClient.on("error", (err) => {
  console.error("MQTT error:", err);
});

let counter = 2;

async function publishCounter() {
  counter;
  MQTT_TOPIC_PUB.forEach((pub) => {
    mqttClient.publish(pub, counter.toString());
  });
}

async function publishDevice (nameDevice, value){
  mqttClient.publish(`${MQTT_USERNAME}/feeds/${nameDevice}`, value.toString());
  return `${nameDevice} set to ${value}`;
}

publishCounter();
export {
  deviceControl,
  getSensorData
}