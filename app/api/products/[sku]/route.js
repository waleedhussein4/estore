import { NextResponse } from 'next/server';
import connectDB from '@utils/db';
import Product from '@models/Product';
import Category from '@models/Category';
import { getToken } from 'next-auth/jwt';

export async function GET(request, { params }) {
  const { sku } = params;
  await connectDB();

  try {
    const product = await Product.findOne({ sku }).populate('categoryId');
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productData = {
      name: product.name,
      description: product.description,
      price: product.price,
      sku: product.sku,
      stockQuantity: product.stockQuantity,
      mainImage: product.mainImage,
      category: product.categoryId ? product.categoryId.name : 'No category',
      discount: product.discount,
    };

    return NextResponse.json(productData);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { sku } = params;
  await connectDB();

  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }).then(token => token?.user);

  if (!user?.role == 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, description, price, stockQuantity, category, discount } = await request.json();

  try {
    const product = await Product.findOne({ sku });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.stockQuantity = stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
    product.discount = discount !== undefined ? discount : product.discount;

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        product.categoryId = categoryDoc._id;
      }
    }

    await product.save();

    const updatedProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      sku: product.sku,
      stockQuantity: product.stockQuantity,
      mainImage: product.mainImage,
      category: category || 'No category',
      discount: product.discount,
    };

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}
