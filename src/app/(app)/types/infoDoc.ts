type InformacionDoctoresType = {
    docs: {
      id: string,
      nombreDoctor: string,
      fotoDoctor:{
        alt:string,
        url:string
      }
      especialidad:{
        Nombre:string
      }
      diasDisponibles: string,
      horario:{
        desde:string,
        hasta:string
      },
      ubicacion:string,
      costo:number,
      descripcion:string
    }[];
  };