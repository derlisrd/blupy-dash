export const retornaColor = (key : string)=>{
    switch (key) {
      case 'Rechazada':
          return 'red'
        break;
      case 'Vigente':
          return 'green'
        break;
      case 'Contrato Pendiente':
          return 'purple'
        break;
    
      default:
        return 'default'
        break;
    }
  }

export const solicitado = [ 
    {
      color: 'red',
      label: 'No ha solicitado'
    },
    {
      color: 'green',
      label: 'Solicitado'
    },
  ]
 

export const tipos = [ 
  'Registro',
  'Línea de crédito',
  'Adicionales',
  'Ampliación'
]

export const estados : { [clave: string]: string } = {
  "7":'Vigente',
  "11":'Rechazada',
  "3": "Pend. Aprobación",
  "5": "Contrato Pendiente"
}