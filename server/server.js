import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import clubRoutes from './routes/club.routes.js';
import playerRoutes from './routes/player.routes.js';
import shoppingCartRoutes from './routes/shoppingCart.routes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.routes.js';

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'soccer-app';

const connectionString = process.env.DB_CONNECTION
  ? process.env.DB_CONNECTION.replace('%DB_NAME%', DB_NAME)
  : 'mongodb://localhost:27017/' + DB_NAME;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set('returnOriginal', false);

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

server.use(clubRoutes);
server.use(playerRoutes);
server.use(shoppingCartRoutes);
server.use(maintenanceRoutes);

server.listen(4000);
