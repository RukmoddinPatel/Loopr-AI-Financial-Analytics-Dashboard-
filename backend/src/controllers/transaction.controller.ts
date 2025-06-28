import { Request, Response } from 'express';
import Transaction from '../models/transaction.model';
import { exportCSV } from '../utils/csvExporter';

export const getTransactions = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { search, category, status, sortBy, order, page = 1, limit = 10 } = req.query;

  const query: any = { user: userId };

  if (search) {
    query.$or = [
      { category: { $regex: search, $options: 'i' } },
      { status: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) query.category = category;
  if (status) query.status = status;

  const sortQuery: any = {};
  if (sortBy) sortQuery[sortBy as string] = order === 'desc' ? -1 : 1;

  const transactions = await Transaction.find(query)
    .sort(sortQuery)
    .skip((+page - 1) * +limit)
    .limit(+limit);

  const total = await Transaction.countDocuments(query);

  res.json({ transactions, total });
};

export const createTransaction = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const transaction = new Transaction({ ...req.body, user: userId });
  await transaction.save();
  res.status(201).json(transaction);
};

export const exportTransactions = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const columns = (req.query.columns as string)?.split(',') || [];

  const transactions = await Transaction.find({ user: userId }).lean();
  const filePath = await exportCSV(transactions, columns);

  // ✅ Triggers file download in browser
  res.download(filePath, 'transactions.csv');
};

