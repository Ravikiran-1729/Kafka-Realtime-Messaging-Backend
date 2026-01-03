require('dotenv').config();
const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId : process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER] // Replace <PRIVATE_IP:PORT> with your private ip address example (198.168.1.202:9092)
});


module.exports = kafka;
