type PacienteInformacion = {
    docs: {
      id:string,
      nombre:string,
      fotoPaciente:{
        id:string,
        alt:string,
        url:string
      },
      apellido:string,
      identidadPersonal:string,
      fechaNacimiento:string,
      direccion:string,
      telefono:string,
      email:string
    }[];
  };