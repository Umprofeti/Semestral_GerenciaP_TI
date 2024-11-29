import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BotonCerrarSession = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const responseP = await fetch('/api/pacientes/logout', { method: 'POST' });
            const responseA = await fetch('/api/administracion/logout', { method: 'POST' });
            const responseD = await fetch('/api/doctor/logout', { method: 'POST' });

            if (responseP.ok || responseA.ok || responseD.ok) {
                router.push('/login');
            } else {
                console.error('Error logging out');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <Button 
            className="bg-[#f0b2ae] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white"
            onClick={()=>handleLogout()}
        >
            Cerrar sesión
        </Button>
    );
};

export default BotonCerrarSession;
