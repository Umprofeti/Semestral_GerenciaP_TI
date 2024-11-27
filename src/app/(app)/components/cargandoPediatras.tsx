import { LoaderCircle, LoaderCircleIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { CarouselItem } from "./ui/carousel";

const CargandoPediatras = () => {
    return ( 
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={`cargandoPediatras-${index}`} className="pt-1 md:basis-1/4 ">
            <div className="p-1 ">
              <Card className="md:h-96 w-full">
                <CardContent className="flex md:flex-col items-center justify-center gap-2 bg-[#cce7e4] py-2 md:h-full ">
                  <div className="w-2/5 md:w-full flex justify-center items-center bg-[#8ccac3] rounded-lg overflow-hidden h-28 max-h-28 md:h-56 md:max-h-56 animate-pulse">
                    <LoaderCircleIcon className="animate-spin" size={50} />
                  </div>
                  <div className="w-3/5 md:w-full flex items-center md:items-start ">
                    <ul className="w-full flex flex-col gap-2">
                      <li className="h-5 w-full bg-zinc-400 animate-pulse delay-75"></li>
                      <li className="h-5 w-full bg-zinc-400 animate-pulse"></li>
                      <li className="h-5 w-full bg-zinc-400 animate-pulse delay-75"></li>
                      <li className="h-5 w-full bg-zinc-400 animate-pulse"></li>

                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </>
     );
}
 
export default CargandoPediatras;