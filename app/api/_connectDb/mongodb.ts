import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  const db = await mongoose.connect(process.env.MONGODB_URI);

  isConnected = db.connections[0].readyState === 1;
  console.log("=> using new database connection");
}
