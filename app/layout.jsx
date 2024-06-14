import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@components/Navbar";
import SessionProvider from "@utils/SessionProvider";
// import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Estore",
  description: "Your one-stop e-commerce solution.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
