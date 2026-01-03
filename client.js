const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId : 'my-kafka-app',
    brokers: ['10.130.93.50:9092']
});


module.exports = kafka;
