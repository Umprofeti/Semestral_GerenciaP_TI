'use client'
import { Folder, House, UserRound } from "lucide-react";
import Link from "next/link";
import { useUserConext } from "../context/userContext";

const MobileNavigation = () => {
  const { state, updateState } = useUserConext();


  return (
    <div className="bg-[#89ccc5] fixed bottom-5 left-1/2 transform -translate-x-1/2 w-2/3 flex items-center justify-between rounded-lg px-4 py-2 md:hidden z-10">
      <Link href={'/profileuser'}><UserRound size={32} className="text-white" /></Link>
      <Link href={`/dashboard/user/${state.id}`}><House size={32} className="text-white" /></Link>
      <Link href={'/historial-de-citas'}><Folder size={32} className="text-white" /></Link>
    </div>
  );
}

export default MobileNavigation;