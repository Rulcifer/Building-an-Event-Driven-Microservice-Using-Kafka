const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "food-order-consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "food-order-group" });

const processOrder = async (order) => {
  console.log(`Proses pesanan: ${JSON.stringify(order)}`);
};

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "food-orders", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value.toString());
      try {
        await processOrder(order);
      } catch (error) {
        console.error(`Kesalahan memproses pesanan: ${error.message}`);
      }
    },
  });
};

runConsumer().catch(console.error);
