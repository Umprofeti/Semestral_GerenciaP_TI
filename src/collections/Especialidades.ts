export const Especialidad = {
    slug: 'especialidades',
    admin: {
        useAsTitle: 'Nombre',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'Nombre',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'Color',
            type: 'text',
            required: true,
            unique: true,
        },
    ],
};
