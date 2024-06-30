import { getUser } from "@/lib/lucia"
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await getUser();
  if(!user) {
    redirect('/auth');
  }
  return (
    <div>You are login: {user.email}</div>
  )
}

export default DashboardPage
