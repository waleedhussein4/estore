import { NextResponse } from 'next/server';
import connectDB from '@utils/db';
import Product from '@models/Product';
import { getToken } from 'next-auth/jwt';

export async function GET(req) {
  await connectDB();

  try {
    const products = await Product.find({}).populate('categoryId');
    const productsData = products.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      stockQuantity: product.stockQuantity,
      category: product.categoryId ? product.categoryId.name : 'No category',
      discount: product.discount,
    }));

    return NextResponse.json(productsData);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function PUT(request) {
  await connectDB();

  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }).then(token => token?.user);

  if (!user?.role == 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, stockQuantity } = await request.json();

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    product.stockQuantity = stockQuantity;
    await product.save();

    const productData = {
      id: product._id,
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      stockQuantity: product.stockQuantity,
      category: product.categoryId ? product.categoryId.name : 'No category',
      discount: product.discount,
    };

    return NextResponse.json({ success: true, product: productData });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}
