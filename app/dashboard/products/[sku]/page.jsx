import ProductDetails from './ProductDetails';

export default function Product({ params }) {
  const { sku } = params;

  return (
    <div className='overflow-y-auto h-full w-full flex items-center justify-center'>
      <ProductDetails sku={sku} />
    </div>
  );
}
