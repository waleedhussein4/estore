import { NextResponse } from "next/server";
import Product from "@models/Product";
import dbConnect0 from "@utils/db";
import Category from "@models/Category";

// paginated product listing
export async function GET(req) {
  await dbConnect0();

  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page"));

  const limit = 20;

  try {
    const products = await Product.find({})
      .limit(limit)
      .skip((page - 1) * limit)

    const productsData = await Promise.all(products.map(async (product) => {
      const category = await Category.findById(product.categoryId);
      const categoryName = category ? category.name : "No category";
      return {
        id: product._id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price,
        stockQuantity: product.stockQuantity,
        category: categoryName,
        discount: product.discount,
        mainImage: product.mainImage,
      };
    }));

    return NextResponse.json(productsData);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}