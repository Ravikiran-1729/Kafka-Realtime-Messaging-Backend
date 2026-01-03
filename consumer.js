require('dotenv').config();
const kafka = require('./client');

const group = process.argv[2];
const topic = process.env.KAFKA_TOPIC;
let counter = 1;


async function init() {
    const consumer = kafka.consumer({ groupId: group });

    console.log('Connecting consumer...');
    await consumer.connect();
    console.log('Consumer connected.');

    await consumer.subscribe({
        topic: topic,
        fromBeginning: false
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                
                const key = message.key.toString();
                const value = JSON.parse(message.value.toString());

                console.log(`${counter++} :- Received message for conversation/group: ${key}`);
                console.log(`Topic :- ${topic}`);
                console.log(`Partition :- ${partition}`);
                console.log(value);
            } catch (err) {
                console.error('Message processing failed:', err);
            }
        }
    });
}
init().catch(console.error);
