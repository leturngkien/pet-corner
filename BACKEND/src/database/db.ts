import mongoose from 'mongoose';
import ENV_VARS from '../config/config.js';

export const connectDB = async () => {
  try {
    if (!ENV_VARS.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    // Kiểm tra nếu đã kết nối rồi thì không cần kết nối lại
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB đã được kết nối trước đó');
      return;
    }

    mongoose.set('strictQuery', false); // Thêm dòng này để tắt cảnh báo

    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout sau 5 giây thay vì mặc định
      socketTimeoutMS: 45000, // Timeout socket
      // Các options này phải đúng theo kiểu ConnectOptions của mongoose
    } as mongoose.ConnectOptions);
    console.log(`Kết nối thành công: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error('Error connecting to MongoDB: Unknown error');
    }
    process.exit(1); // 1 means exist with failure, 0 means exist with success
  }
};
