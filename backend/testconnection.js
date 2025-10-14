import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔍 Testing new MongoDB credentials...');
    console.log('🔍 Connection string (partial):', process.env.MONGO_URI.substring(0, 50) + '...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connection successful!');
    console.log('🔍 Database name:', conn.connection.name);
    
    // Test listing collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('🔍 Available collections:', collections.map(c => c.name));
    
    // Test counting documents
    const userCount = await conn.connection.db.collection('dashboardusers').countDocuments();
    console.log('🔍 User count in dashboardusers:', userCount);
    
    // Test finding one document
    const oneUser = await conn.connection.db.collection('dashboardusers').findOne();
    console.log('🔍 Sample user found:', !!oneUser);
    
    if (oneUser) {
      console.log('🔍 Sample user email:', oneUser.Email);
    }
    
    await mongoose.connection.close();
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error name:', error.name);
  }
};

testConnection();