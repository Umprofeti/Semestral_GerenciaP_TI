import type { CollectionConfig } from 'payload';

export const Expedientes: CollectionConfig = {
    slug: 'expedientes',
    admin: {
        useAsTitle: 'paciente',
    },
    access: {
        read: () => true,
        create: () => true,
        update:()=>true
      },
    fields: [
        {
            name:'paciente',
            type:'relationship',
            relationTo:'pacientes',
            required:true
        },
        {
            name: 'tiposangre',
            type: 'select',
            options: [
                {
                    label: '---',
                    value: '---'
                },
                {
                    label: 'O+',
                    value: 'O+'
                },
                {
                    label: 'O-',
                    value: 'O-'
                },
                {
                    label: 'A+',
                    value: 'A+'
                },
                {
                    label: 'A-',
                    value: 'A-'
                },
                {
                    label: 'B+',
                    value: 'B+'
                },
                {
                    label: 'B-',
                    value: 'B-'
                },
                {
                    label: 'AB+',
                    value: 'AB+'
                },
                {
                    label: 'AB-',
                    value: 'AB-'
                }
            ],
            required: true,
        },        
        {
            name: 'alergia',
            type:'text',
            defaultValue:'---',
            required:false
        },
        {
            name: 'condiciones',
            type:'text',
            defaultValue:'---',
            required:false
        },
        {
            name: 'medicamentos',
            type:'text',
            defaultValue:'---',
            required:false
        },
    ]
}