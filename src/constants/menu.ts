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
                id: 1,
                title: 'Consulta de firma',
                url: '/farma/consulta-firma-contratos',
            },
            {
                id: 2,
                title: 'Consulta de clientes',
                url: '/farma/consulta-clientes',
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
                title: 'Enviar notificaciones',
                url: '/notificaciones/enviar-notificaciones',
            }
        ]
    },
    {
        id: 6,
        title: 'Ventas',
        icon: 'message',
        color: '#0066cc',
        url: '/ventas',
        open: false
    }
]