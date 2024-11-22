import type { CollectionConfig } from 'payload'

export const Especialidad: CollectionConfig = {
    slug: 'Especialidades',
    admin: {},
    fields:[
        {
            name:'Nombre',
            type:"text",
            required:true,
            unique:true
        }
    ]
}
