import Product from '@models/Product'; // Update with the actual path to your Product model
import { generateUniqueSKU } from '@utils/skuManager'; // Update with the actual path to your SKU generation function
import mongoose from 'mongoose';
import connectDB from '@utils/db';
import Category from '@models/Category';
import dbConnect from '@utils/db';

export const generateSampleProducts = async (numProducts) => {
  await connectDB();

  const sampleProducts = [];

  for (let i = 0; i < numProducts; i++) {
    const sku = await generateUniqueSKU();

    const product = new Product({
      name: `Product ${i + 1}`,
      description: `Description for Product ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
      sku: sku,
      stockQuantity: Math.floor(Math.random() * 1000) + 1, // Random stock quantity between 1 and 1000
      mainImage: `https://via.placeholder.com/150?text=Product+${i + 1}`, // Placeholder image
      categoryId: '6667676c09b0e76378755b18', // Generating a random ObjectId for categoryId
      discount: Math.floor(Math.random() * 30), // Random discount between 0 and 30%
    });

    sampleProducts.push(product);
  }

  try {
    await Product.insertMany(sampleProducts);
    console.log(`${numProducts} sample products generated successfully.`);
  } catch (error) {
    console.error('Error generating sample products:', error);
  }
};

export const createGroceriesCategory = async () => {
  await dbConnect();

  try {
    const groceriesCategory = new Category({
      name: 'Groceries',
      description: 'All grocery-related products',
    });

    await groceriesCategory.save();
    console.log('Groceries category created successfully.');
  } catch (error) {
    console.error('Error creating groceries category:', error);
  } finally {
    mongoose.connection.close();
  }
};