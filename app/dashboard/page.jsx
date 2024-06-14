import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route.js";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col justify-between items-center w-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>

      </div>
      <p>Welcome, {session.user.username}!</p>
    </div>
  )
}

export default Dashboard;
