import type { CollectionConfig } from 'payload'

export const Administracion: CollectionConfig = {
    slug: 'administracion',
    admin: {
        useAsTitle: 'nombre',
    },
    access: {
        read: () => true,
    },
    auth: true,
    fields: [
        {
            name: 'nombre',
            type: 'text',
            label: 'Nombre de la persona de administración',
            required: true,
        },
        {
            name: 'fotoAdministrador',
            type: 'upload',
            label: 'Foto de la persona (opcional)',
            relationTo: 'media',
            required: false,
        },
    ],
}
