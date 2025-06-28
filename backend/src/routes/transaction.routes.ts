import express from 'express';
import {
  getTransactions,
  createTransaction,
  exportTransactions
} from '../controllers/transaction.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(verifyToken);

router.get('/', getTransactions);
router.post('/', createTransaction);
router.get('/export', exportTransactions);

export default router;
