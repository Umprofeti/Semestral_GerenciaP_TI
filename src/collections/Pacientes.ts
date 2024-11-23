import type { CollectionConfig } from 'payload';

export const Pacientes: CollectionConfig = {
    slug: 'pacientes',
    admin: {
        useAsTitle: 'nombre',
    },
    access: {
        read: () => true,
        create: () => true
      },
    fields: [
        {
            name: 'nombre',
            type: 'text',
            required: true,
        },
        {
            name: 'fotoPaciente',
            type: 'upload',
            label: 'Foto del paciente',
            relationTo: 'media',
            required: false,
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
            name: 'fechaNacimiento',
            type: 'date',
            required: true,
        },
        {
            name: 'direccion',
            type: 'textarea',
            required: false,
        },
        {
            name: 'telefono',
            type: 'text',
            required: true,
        },
        {
            name: 'correo',
            type: 'email',
            required: true,
            unique: true,
        },
        {
            name: 'contraseña',
            type: 'text',
            required: true,
        },
    ],
};
