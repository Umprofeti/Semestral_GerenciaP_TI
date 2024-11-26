import type { CollectionConfig } from 'payload';

export const Citas: CollectionConfig = {
    slug: 'citas',
    admin: {
        useAsTitle: 'Doctor',
    },
    access: {
        read: () => true,
        create: () => true,
        delete:()=>true
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
            name:'cancelado',
            type:'checkbox',
            label:'Cancelado?',
            required:true,
            defaultValue:false
        },
        {
            name:'Completado',
            type:'checkbox',
            defaultValue:false,
            label:'¿Cita culminada?'
        },
        {
            name:'Hora',
            type:'date',
            label:'Hora de cita',
            required:true,
            admin: {
                date: {
                    pickerAppearance: 'timeOnly',
                    displayFormat: 'h:mm aa',
                }
            }  
        },
        {
            name:'Fecha',
            type:'date',
            label:'Fecha de la cita',
            required:true,
        }
    ],
};
