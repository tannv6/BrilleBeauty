import config from '@/server/config';
import mysql from 'mysql2/promise';

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.DATABASE_HOST,
      user: 'brillebe_root',
      password: 'B.@vZWMly_qW',
      database: 'brillebe_root',
    });

    console.log('Connected to the database', process.env.DATABASE_HOST);
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export default connectDB;
