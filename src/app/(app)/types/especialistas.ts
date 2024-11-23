type EspecialistaResponse = {
    docs: {
      id: string,
      nombreDoctor: string,
      fotoDoctor:{
        alt:string,
        url:string
      }
      diasDisponibles: string,
      horario:{
        desde:string,
        hasta:string
      }
      costo:number
    }[];
  };