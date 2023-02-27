import client from "./config";

const connectDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database is connected!");
};

export default connectDatabase;
