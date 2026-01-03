const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId : 'my-kafka-app',
    brokers: ['<PRIVATE_IP>:9092'] // Replace <PRIVATE_IP> with your private ip address example (198.168.1.202)
});


module.exports = kafka;
