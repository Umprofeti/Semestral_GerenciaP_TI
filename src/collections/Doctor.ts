import type { CollectionConfig } from 'payload'

export const Doctores: CollectionConfig = {
    slug: 'Doctor',
    admin: {
        useAsTitle: 'nombreDoctor',
    },
    fields: [
        {
            name: 'nombreDoctor',
            type: 'text',
            label: 'Nombre del doctor',
            required: true,
            unique: true,
        },
        {
            name: 'Doctor/a destacada?',
            type: 'checkbox',
            label: 'Marcar como docto/a destacado',
            defaultValue: false,
        },
        {
            name: 'fotoDoctor',
            type: 'upload',
            label: 'Foto del doctor',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'especialidad',
            type: 'select',
            label: 'Tipo de especialidad',
            required: true,
            options: [
                { label: 'Psiquiatría', value: 'psiquiatria' },
                { label: 'Cardiología', value: 'cardiologia' },
                { label: 'Dermatología', value: 'dermatologia' },
                { label: 'Urología', value: 'urologia' },
                { label: 'Ginecología', value: 'ginecologia' },
                { label: 'Neurología', value: 'neurologia' },
                { label: 'Oftalmología', value: 'oftalmologia' },
                { label: 'Oncología', value: 'oncologia' },
                { label: 'Ortopedía', value: 'ortopedia' },
                { label: 'Pediatría', value: 'pediatria' },
            ],
        },        
        {
            name: 'diasDisponibles',
            type: 'select',
            label: 'Días para atender',
            required: true,
            options: [
                { label: 'Lunes a Viernes', value: 'lunes-viernes' },
                { label: 'Sábado y Domingo', value: 'sabado-domingo' },
                { label: 'Lunes, Miércoles y Viernes', value: 'lunes-miercoles-viernes' },
                { label: 'Martes y Jueves', value: 'martes-jueves' },
            ],
        },
        {
            name: 'horario',
            type: 'group',
            label: 'Hora del día disponible',
            fields: [
                {
                    name: 'desde',
                    type: 'text',
                    label: 'Disponible desde',
                    required: true,
                    admin: {
                        placeholder: 'Ejemplo: 9:00 AM',
                    },
                },
                {
                    name: 'hasta',
                    type: 'text',
                    label: 'Disponible hasta',
                    required: true,
                    admin: {
                        placeholder: 'Ejemplo: 4:00 PM',
                    },
                },
            ],
        },
        {
            name: 'ubicacion',
            type: 'text',
            label: 'Ubicación',
            required: true,
            admin: {
                placeholder: 'Ejemplo: Sala 101, Ala Este',
            },
        },
        {
            name: 'costo',
            type: 'number',
            label: 'Costo',
            required: true,
            admin: {
                placeholder: 'Ejemplo: 500',
            },
        },
        {
            name: 'descripcion',
            type: 'textarea',
            label: 'Descripción',
            required: false,
            admin: {
                placeholder: 'Escribe una breve descripción del doctor o sus servicios.',
            },
        },
    ],
}
