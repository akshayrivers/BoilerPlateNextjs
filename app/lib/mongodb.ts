import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string; // Use MONGO_URI here
console.log(MONGODB_URI);
// Track the connection state to avoid reconnecting on every request
let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Wait 30 seconds before timing out
      socketTimeoutMS: 45000, // Time out after 45 seconds for network activity
    });
    isConnected = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Database connection failed');
  }
};