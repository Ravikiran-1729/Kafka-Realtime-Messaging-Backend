require('dotenv').config();
const kafka = require('./client');
// const p = process.argv[2].toString();
const senderId = 'user-1';   // replace with sender mobile_no
const receiverId = 'user-2'; // replace with receiver mobile_no 
const message = "Hey, How's you?";

const conversationId = [senderId, receiverId].sort().join(':');

const topic = process.env.KAFKA_TOPIC;

function syncDate() {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ` +
           `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

async function init() {
    const producer = kafka.producer();

    console.log('Producer Connecting...');
    await producer.connect();
    console.log('Producer Connected.');

    const sends = [];

    for (let i = 0; i < 1; i++) {
        console.log(`${i+1} :- Message queued`);

        sends.push(
            producer.send({
                topic: topic,
                messages: [
                    {
                        key: conversationId,
                        value: JSON.stringify({
                            senderId,
                            receiverId,
                            message,
                            timestamp: syncDate()
                        })
                    }
                ],
                acks: -1,
                timeout: 30000
            })
        );
    }

    try {
        let start = Date.now();
        await Promise.all(sends);
        let end = Date.now();
        console.log(start);
        console.log(end);
        console.log(end-start);
        console.log("Time ms :- ", end-start);
        console.log('All messages sent successfully');
    } catch (err) {
        console.error('One or more messages failed:', err);
    }

    console.log('Producer Disconnecting...');
    await producer.disconnect();
    console.log('Producer Disconnected.');
}


init().catch(console.error);
