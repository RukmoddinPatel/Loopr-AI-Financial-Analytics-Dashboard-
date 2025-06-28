import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

export const exportCSV = async (data: any[], columns: string[]) => {
  const filePath = path.join(__dirname, '../../export.csv');

  const headers = columns.map(col => ({ id: col, title: col.toUpperCase() }));

  const writer = createObjectCsvWriter({
    path: filePath,
    header: headers,
  });

  const records = data.map(item => {
    const filtered: any = {};
    columns.forEach(col => {
      filtered[col] = item[col];
    });
    return filtered;
  });

  await writer.writeRecords(records);
  return filePath;
};
