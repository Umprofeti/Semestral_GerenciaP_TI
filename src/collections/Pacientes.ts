import type { CollectionConfig } from 'payload';

export const Pacientes: CollectionConfig = {
    slug: 'pacientes',
    admin: {
        useAsTitle: 'apellido',
    },
    auth: true,
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'nombre',
            type: 'text',
            required: true,
        },
        {
            name: 'apellido',
            type: 'text',
            required: true,
        },
        {
            name: 'identidadPersonal',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'genero',
            type: 'select',
            options: [
                {
                    label: 'Hombre',
                    value: 'Hombre',
                },
                {
                    label: 'Mujer',
                    value: 'Mujer',
                },
            ],
            defaultValue: 'Mujer',
            required: true,
        },
        {
            name: 'fechaNacimiento',
            type: 'date',
            required: true,
        },
        {
            name: 'edad',
            type: 'number',
            required: true,
        },
        {
            name: 'telefono',
            type: 'text',
            required: true,
        },
        {
            name: 'direccion',
            type: 'textarea',
            required: false,
        },
        {
            name: 'fotoPaciente',
            type: 'upload',
            label: 'Foto del paciente',
            relationTo: 'media',
            required: false,
        },
    ],
    hooks: {
        afterChange: [
            async ({ doc, req, operation }) => {
                if (operation === 'create') {
                    await req.payload.create({
                        collection: 'expedientes',
                        data: {
                            paciente: doc.id,
                            tiposangre: '---', // Puedes definir un valor predeterminado aquí.
                            alergia: '---',
                            condiciones: '---',
                            medicamentos: '---',
                        },
                        overrideAccess: true,
                    });
                }
            },
        ],
    },
};
