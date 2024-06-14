import SKU from '@models/SKU'; // Update with the actual path to your SKU model
import dbConnect from './db';

export const generateUniqueSKU = async () => {
  await dbConnect();
  
  let unique = false;
  let sku;

  while (!unique) {
    sku = `SKU${Math.floor(Math.random() * 1000000)}`; // Generate a random SKU

    try {
      const existingSKU = await SKU.findOne({ sku });
      if (!existingSKU) {
        await SKU.create({ sku });
        unique = true;
      }
    } catch (error) {
      console.error('Error generating SKU:', error);
    }
  }

  return sku;
};
