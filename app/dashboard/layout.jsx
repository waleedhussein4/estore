import Link from "next/link";

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBox } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";

export const metadata = {
  title: "Estore",
  description: "Your one-stop e-commerce solution.",
};

export default async function DashboardLayout({ children }) {
  return (
    <div className="flex flex-row justify-between items-center h-[calc(100vh-5rem)]">
      <nav className="w-64 border border-black h-full p-2 flex flex-col items-left">
        <div className="flex flex-col gap-8 font-bold">
          <Link href="/dashboard" className="flex flex-row items-center gap-4 hover:bg-blue-100 rounded p-2">
            <MdOutlineSpaceDashboard className="w-6 h-6" />
            <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/products" className="flex flex-row items-center gap-4 hover:bg-blue-100 rounded p-2">
            <BsBox className="w-6 h-6" />
            <span>Products</span>
          </Link>
          <Link href="/dashboard/orders" className="flex flex-row items-center gap-4 hover:bg-blue-100 rounded p-2">
            <FiShoppingCart className="w-6 h-6" />
            <span>Orders</span>
          </Link>
          <Link href="/dashboard/inventory" className="flex flex-row items-center gap-4 hover:bg-blue-100 rounded p-2">
            <MdOutlineInventory2 className="w-6 h-6" />
            <span>Inventory</span>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
