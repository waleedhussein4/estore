import { NextResponse } from "next/server";
import Product from "@models/Product";
import dbConnect from "@utils/db";

export async function GET(req) {
  await dbConnect();

  const product = await Product.findOne({ sku: req.params.sku }).populate("categoryId");

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const productData = {
    id: product._id,
    name: product.name,
    description: product.description,
    sku: product.sku,
    price: product.price,
    stockQuantity: product.stockQuantity,
    category: product.categoryId ? product.categoryId.name : "No category",
    discount: product.discount,
  };

  return NextResponse.json(productData);
}
