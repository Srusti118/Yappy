import mongoose from "mongoose";
import dns from "node:dns";

export const connectDB = async () => {
  try {
    const dnsServers = process.env.MONGODB_DNS_SERVERS?.split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsServers?.length) {
      dns.setServers(dnsServers);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1); // optional but good practice
  }
};
