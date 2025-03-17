export default [
    {
        id: 1,
        title: 'Inicio',
        icon: 'home',
        color: '#0066cc',
        url: '/',
        open: false
    },
    {
        id: 2,
        title: 'Clientes',
        icon: 'users',
        color: '#0066cc',
        url: '/clientes',
        open: false
    },
    {
        id: 3,
        title: 'Solicitudes',
        icon: 'clipboard',
        color: '#0066cc',
        url: '/solicitudes',
        open: false
    },
    {
        id: 4,
        title: 'Farma',
        icon: 'building',
        color: '#0066cc',
        url: '#',
        open: false,
        submenu: [
            {
                id: 2,
                title: 'Cliente por doc.',
                url: '/farma/clientes/ficha',
            },
            {
                id: 232,
                title: 'Cliente por codigo',
                url: '/farma/clientes/codigo',
            },
        ]
    },
    {
        id: 123,
        title: 'Contratos',
        icon: 'file-description',
        color: '#0066cc',
        url: '#',
        open: false,
        submenu: [
            {
                id: 1,
                title: 'Por documento',
                url: '/contratos/pordocumento',
            },
            {
                id: 2,
                title: 'Por código',
                url: '/contratos/porcodigo',
            }
        ]
    },
    {
        id: 5,
        title: 'Notificaciones',
        icon: 'bell',
        color: '#0066cc',
        url: '/reportes',
        open: false,
        submenu: [
            {
                id: 1,
                title: 'Individual',
                url: '/notificaciones/individual',
            },
            {
                id: 2,
                title: 'Difusión',
                url: '/notificaciones/difusion',
            }
        ]
    },
    {
        id: 6,
        title: 'Ventas',
        icon: 'message',
        color: '#0066cc',
        url: '/ventas',
        open: false,
        submenu: [
            {
                id: 123422,
                title: 'Por factura',
                url: '/ventas/por-factura',
            },
            {
                id: 34343,
                title: 'Comparativa',
                url: '/ventas/comparativa',
            },
            {
                id: 10,
                title: 'Por alianzas',
                url: '/ventas/alianzas',
            },
            {
                id: 4,
                title: 'Por fecha',
                url: '/ventas/por-fecha',
            },
            {
                id: 5,
                title: 'Por mes',
                url: '/ventas/acumuladas-mes',
            },
            {
                id: 6,
                title: 'Acumuladas',
                url: '/ventas/acumuladas',
            }
        ]
    }
]