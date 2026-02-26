// test-next-mongodb.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

// const MONGODB_URI = "mongodb+srv://eidiPredictionDb:S@E8dLBeT3v%-5E@cluster0.l4j2so8.mongodb.net/eidi-prediction?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb+srv://admin:admin@prediction.hffzy64.mongodb.net/?EidiAmountPredictioon=prediction"

console.log('🔌 Testing Mongoose connection...');
console.log('URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // Force IPv4
    });
    
    console.log('✅ Mongoose connected!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('📍 Host:', mongoose.connection.host);
    
    // Test creating a model
    const Test = mongoose.model('Test', new mongoose.Schema({
      test: String,
      date: Date
    }));
    
    // Test write
    const doc = await Test.create({
      test: 'Connection working!',
      date: new Date()
    });
    console.log('✅ Created test document:', doc);
    
    // Test read
    const found = await Test.findOne({ test: 'Connection working!' });
    console.log('✅ Found test document:', found);
    
    // Clean up
    await Test.deleteMany({});
    console.log('🧹 Cleaned up');
    
    await mongoose.disconnect();
    console.log('👋 Disconnected');
    
  } catch (error) {
    console.error('❌ Failed:');
    console.error('Name:', error.name);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
  }
}

testConnection();