# Kafka Chat System (Windows + Docker)

A simple Kafka-based chat/messaging system using **Zookeeper**, **Kafka**, and **Node.js** producers and consumers, running on **Docker on Windows**.

---

## Requirements

- Docker Desktop (running)
- Node.js (v16 or higher)
- npm
- Windows CMD / PowerShell

---

## System Architecture

- **Zookeeper** – Manages Kafka metadata
- **Kafka Broker** – Stores and distributes messages
- **Producer (Node.js)** – Sends messages to Kafka
- **Consumer (Node.js)** – Reads messages using consumer groups

---

## Setup Instructions

### 1. Start Zookeeper

Open **CMD** and run:

```cmd
docker run -p 2181:2181 zookeeper
```

Keep this terminal open.

---

### 2. Start Kafka (after Zookeeper)

Open a **new CMD window** and run:

```cmd
docker run -p 9092:9092 ^
-e KAFKA_BROKER_ID=1 ^
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 ^
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 ^
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 ^
confluentinc/cp-kafka:7.5.0
```

Replace `<PRIVATE_IP>` with your local system IP (example: `192.168.1.10`).

---

### 3. Create Kafka Topic

```cmd
node admin.js
```

Creates the Kafka topic used by producers and consumers.

---

### 4. Run Consumers (Multiple Groups)

```cmd
node consumer.js group1
node consumer.js group2
```

- Same group → load-balanced consumption  
- Different groups → each group receives all messages  

---

### 5. Run Producer

```cmd
node producer.js
```

Publishes messages to Kafka with ordered delivery.

---

## Kafka Message Behavior

- Messages are sent with a **key (`conversationId`)**
- Same key → same partition
- Guarantees **message ordering per conversation**
- Correct design for chat systems

---

## Ports Used

| Service    | Port |
|-----------|------|
| Zookeeper | 2181 |
| Kafka     | 9092 |

---

## Useful Docker Commands

```cmd
docker ps
docker logs <container_id>
docker stop <container_id>
docker rm <container_id>
docker volume prune
```

---

## Use Cases

- Chat / messaging applications
- Kafka learning projects
- Consumer group testing
- Event-driven systems

---

## Notes

- Always start **Zookeeper before Kafka**
- Kafka will not distribute messages across partitions if a fixed key is used
- For scaling, increase partitions and conversations

---

## License

For educational and development purposes.