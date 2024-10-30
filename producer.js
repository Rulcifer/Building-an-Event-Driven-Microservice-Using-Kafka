const { Kafka } = require("kafkajs");
const fs = require("fs");
const path = require("path");

const kafka = new Kafka({
  clientId: "food-order-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const readCSV = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n").slice(1);
    return lines.map((line) => {
      const [customerId, customerName, itemId, itemName, price] =
        line.split(",");
      return { customerId, customerName, itemId, itemName, price };
    });
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return [];
  }
};

const orders = readCSV(path.join(__dirname, "indonesian_food_orders.csv"));

const produceMessages = async () => {
  try {
    await producer.connect();
    for (const order of orders) {
      await producer.send({
        topic: "food-orders",
        messages: [{ value: JSON.stringify(order) }],
      });
      console.log(`Pesanan diterbitkan: ${JSON.stringify(order)}`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    await producer.disconnect();
  }
};

produceMessages().catch(console.error);
