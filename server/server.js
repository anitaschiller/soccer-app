import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import clubRoutes from './routes/club.routes.js';
import playerRoutes from './routes/player.routes.js';
import shoppingCartRoutes from './routes/shoppingCart.routes.js';


dotenv.config();

const connectionString =
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/soccer-app';

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

server.listen(4000);
