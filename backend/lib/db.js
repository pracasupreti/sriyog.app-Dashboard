import mongoose from "mongoose"


export const connectDB= async()=>{
 try {
    const conn= await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected: ${conn.connection.host}`);
 } catch (error) {
    console.log("error connecting to mongo",error.message)
    
 }
}

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     console.log('🔍 Attempting MongoDB connection...');
//     console.log('🔍 MONGO_URI exists:', !!process.env.MONGO_URI);
    
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 10000,
//       connectTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//       bufferMaxEntries: 0,      // ✅ Disable mongoose buffering
//       bufferCommands: false,    // ✅ Disable mongoose buffering
//       maxPoolSize: 10,
//     });
    
//     console.log(`✅ MongoDB connected: ${conn.connection.host}`);
//     console.log(`🔍 Database name: ${conn.connection.name}`);
//     console.log(`🔍 Ready state: ${conn.connection.readyState}`);
    
//     // ✅ Add connection event listeners
//     mongoose.connection.on('connected', () => {
//       console.log('✅ Mongoose connected event fired');
//     });
    
//     mongoose.connection.on('error', (err) => {
//       console.error('❌ Mongoose error event:', err.message);
//     });
    
//     mongoose.connection.on('disconnected', () => {
//       console.log('⚠️ Mongoose disconnected event fired');
//     });
    
//     mongoose.connection.on('reconnected', () => {
//       console.log('🔄 Mongoose reconnected event fired');
//     });
    
//     // ✅ Test direct collection access
//     const collections = await conn.connection.db.listCollections().toArray();
//     console.log('🔍 Available collections:', collections.map(c => c.name));
    
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     console.log('🔍 Attempting MongoDB connection...');
//     console.log('🔍 MONGO_URI exists:', !!process.env.MONGO_URI);
    
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 10000,
//       connectTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//       maxPoolSize: 10,
//       minPoolSize: 1,
//       maxIdleTimeMS: 30000,
//       // ✅ Removed unsupported options:
//       // bufferMaxEntries: 0,      // ❌ Not supported
//       // bufferCommands: false,    // ❌ Not supported
//     });
    
//     console.log(`✅ MongoDB connected: ${conn.connection.host}`);
//     console.log(`🔍 Database name: ${conn.connection.name}`);
//     console.log(`🔍 Ready state: ${conn.connection.readyState}`);
    
//     // ✅ Set buffer options on mongoose directly
//     mongoose.set('bufferCommands', false);
//     mongoose.set('bufferMaxEntries', 0);
    
//     // ✅ Add connection event listeners
//     mongoose.connection.on('connected', () => {
//       console.log('✅ Mongoose connected event fired');
//     });
    
//     mongoose.connection.on('error', (err) => {
//       console.error('❌ Mongoose error event:', err.message);
//     });
    
//     mongoose.connection.on('disconnected', () => {
//       console.log('⚠️ Mongoose disconnected event fired');
//     });
    
//     mongoose.connection.on('reconnected', () => {
//       console.log('🔄 Mongoose reconnected event fired');
//     });
    
//     // ✅ Test direct collection access
//     const collections = await conn.connection.db.listCollections().toArray();
//     console.log('🔍 Available collections:', collections.map(c => c.name));
    
//     // ✅ Test a simple query to verify connection works
//     const userCount = await conn.connection.db.collection('dashboardusers').countDocuments();
//     console.log('🔍 User count in dashboardusers:', userCount);
    
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// export const connectDB = async () => {
//   try {
//     console.log('🔍 Testing new MongoDB credentials...');
//     console.log('🔍 Connection string (partial):', process.env.MONGO_URI.substring(0, 50) + '...');
    
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 10000,
//       connectTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//     });
    
//     console.log('✅ Connection successful!');
//     console.log('🔍 Database name:', conn.connection.host);
    
//     // Test listing collections
//     const collections = await conn.connection.db.listCollections().toArray();
//     console.log('🔍 Available collections:', collections.map(c => c.name));
    
//     // Test counting documents
//     const userCount = await conn.connection.db.collection('dashboardusers').countDocuments();
//     console.log('🔍 User count in dashboardusers:', userCount);
    
//     // Test finding one document
//     const oneUser = await conn.connection.db.collection('dashboardusers').findOne();
//     console.log('🔍 Sample user found:', !!oneUser);
    
//     if (oneUser) {
//       console.log('🔍 Sample user email:', oneUser.Email);
//     }
    
//     await mongoose.connection.close();
//     console.log('✅ Test completed successfully!');
    
//   } catch (error) {
//     console.error('❌ Connection test failed:', error.message);
//     console.error('❌ Error code:', error.code);
//     console.error('❌ Error name:', error.name);
//   }
// };