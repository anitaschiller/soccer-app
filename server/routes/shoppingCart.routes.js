import express from 'express';
import {
  getShoppingCart,
  postShoppingCart,
  updateShoppingCart,
} from '../controllers/shoppingCart.controller.js';

const router = express.Router();

router.get('/shopping-cart/:clubId', getShoppingCart);
router.post('/shopping-cart/:clubId', postShoppingCart);
router.put('/shopping-cart/:clubId', updateShoppingCart);

export default router;
