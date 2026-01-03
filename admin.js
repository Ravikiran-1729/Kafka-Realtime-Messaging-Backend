require('dotenv').config();
const kafka= require('./client');
const topic = process.env.KAFKA_TOPIC;

async function init() {
    const admin = kafka.admin();

    console.log("Admin connecting...");
    await admin.connect();
    console.log("Admin connected");

    let list = await admin.listTopics();

    console.log(list);

    if(!list.includes(topic)){
        console.log('Creating topics....');
        await admin.createTopics({
            waitForLeaders: true,
            topics : [
                {
                    topic : topic,
                    numPartitions : 2,
                    replicationFactor : 1,
                }
            ]
        });
        console.log('Topic Created!!')
    }else{
        console.log("Already Exist Topic");
    }


    console.log('Disconnecting Admin...')
    await admin.disconnect();
}

init().catch((error) =>{
    console.log(error);
})
