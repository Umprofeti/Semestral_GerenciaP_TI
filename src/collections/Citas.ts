import type { CollectionConfig } from 'payload';

export const Citas: CollectionConfig = {
    slug: 'citas',
    admin: {
        useAsTitle: 'Doctor',
    },
    access: {
        read: () => true,
        create: () => true
      },
    fields: [
        {
            name: "Doctor",
            type: 'relationship',
            label: 'Doctor de la cita',
            relationTo: 'doctor',
            required: true,
        },
        {
            name:"Paciente",
            type:'relationship',
            label:'Paciente',
            relationTo:'pacientes',
            required: true
        },
        {
            name:'Completado',
            type:'checkbox',
            defaultValue:false,
            label:'¿Cita culminada?'
        },
        {
            name:'Hora',
            type:'text',
            required:true,
            label:'Hora de cita'
        },
        {
            name:'Fecha',
            type:'date',
            required:true,
            label:'Fecha de la cita'
        }
    ],
};
