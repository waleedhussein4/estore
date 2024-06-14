import dbConnect from '@utils/db';
import Order from '@models/Orders';
import { getToken } from 'next-auth/jwt';

export async function GET(req) {
  await dbConnect();

  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }).then(token => token?.user);

  if (!user?.role == 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }F

  const orders = await Order.find({}).populate('items');
  return new Response(JSON.stringify(orders), {
    headers: { 'Content-Type': 'application/json' },
  });
}
