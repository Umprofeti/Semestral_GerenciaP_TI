import type { CollectionConfig } from 'payload'

export const Pacientes: CollectionConfig = {
<<<<<<< HEAD
  slug: 'pacientes',
  admin: {
    useAsTitle: 'nombre',
  },
  auth: true,
  access: {
    read: () => true,
    create: () => true,
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
  ],
}
=======
    slug: 'pacientes',
    admin: {
        useAsTitle: 'apellido',
    },
    auth: true,
    access: {
        read: () => true,
        create: () => true,
        update:()=>true,
        delete:()=>true
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
                    value: 'Hombre'
                },
                {
                    label: 'Mujer',
                    value: 'Mujer'
                }
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
};
>>>>>>> f0ded1485cb8c1ca5ee988b5a8cf8bd1063b2848
