import { Folder, House, UserRound } from "lucide-react";

const MobileNavigation = () => {
    return ( 
        <div className="bg-[#89ccc5] fixed bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 flex items-center justify-between rounded-lg px-4 py-2 md:hidden z-10">
        <UserRound size={32} className="text-white" />
        <House size={32} className="text-white" />
        <Folder size={32} className="text-white" />
      </div>
     );
}
 
export default MobileNavigation ;