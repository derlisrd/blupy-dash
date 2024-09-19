
import { BellIcon, CalendarIcon, ChatIcon, EmailIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useClienteProvider } from "./useclienteprovider";
import moment from "moment";
import { formClienteType } from "../../../types/form.cliente";
import { Column, Table } from "react-virtualized";
import { IconButton, Stack, Tooltip } from "@chakra-ui/react";

/* const funcionario = [
  'NO',
  'FUNCIONARIO FARMA'
]
const aso : { [clave: string]: string } = {
  '0':'NO',
  '1':'Asociacion'
} */

function TablaClientes() {

  const {setModals,modals,setForm,lista} = useClienteProvider()

  const openModal = (f : formClienteType, modal: string)=>{
    if (f) {
      setForm(f)
      setModals({...modals,[modal]:true})
    }
  }

  const list = lista.map((e : formClienteType) => ({
    id: e.id,
    name: e.name,
    cedula: e.cedula,
    celular: e.celular,
    fecha: moment(e.created_at).format('DD-MMM-YYYY HH:mm'),
    aso: (e.asofarma),
    farma: e.funcionario,
    accion: e,
    vendedor: e.vendedor_id
  }));

    const ancho = window.innerWidth> 1380 ? 1380 : window.innerWidth - 60;

    return ( <Table
      width={ancho}
      autoWidth
      height={window.innerHeight - 205}
      headerHeight={20}
      rowHeight={30}
      rowCount={lista.length}
      rowGetter={({ index }) => list[index]}
      >
        <Column
          headerRenderer={({dataKey,})=>(<div>{dataKey}</div>)}
          dataKey="id"
          label="#"
          width={80}
          />
        <Column
          headerRenderer={({dataKey,})=>(<div>{dataKey}</div>)}
          dataKey="cedula"
          label="cedula"
          width={80}
          />
        <Column
          dataKey="name"
          label="Nombre"
          width={250}
        />
        <Column
            dataKey='farma'
            label="Farma"
            width={78}
            cellRenderer={({cellData : e})=>(
              e == 1 ? <p className="FarmaFuncionario">Funcionario</p> : <p>Externo</p>
            )}
        />
        <Column
          dataKey='aso'
          label="Aso"
          width={50}
          cellRenderer={({cellData : e})=>(
            e == 1 ? <p className="AsoBlupy">Aso</p> : <p>No aso</p>
          )}
        />
        <Column dataKey="vendedor" label='vendedor' width={90} />
        <Column dataKey="fecha" label='fecha' width={128} />
        <Column
          dataKey='accion'
          label="Acciones"
          width={160}
          cellRenderer={({cellData :e })=>(
            <Stack direction='row' gap={0.5}>
              <Tooltip placement="top" hasArrow label='Ficha'>
              <IconButton onClick={()=>{openModal(e,'ficha')}} aria-label="Ficha" variant='outline' size='xs' icon={<CalendarIcon color='blue.500' />} />
              </Tooltip>
              <Tooltip placement="top" hasArrow label='Enviar sms'>
              <IconButton onClick={()=>{openModal(e,'sms')}} aria-label="Ficha" variant='outline' size='xs' icon={<ChatIcon color='blue.300' />} />
              </Tooltip>
              <Tooltip placement="top" hasArrow label='Enviar notificacion'>
                <IconButton onClick={()=>{openModal(e,'noti')}} aria-label="Ficha" variant='outline' size='xs' icon={<BellIcon color='red.500' />} />
              </Tooltip>
              <Tooltip placement="top" hasArrow label='Enviar email'>
                <IconButton onClick={()=>{openModal(e,'email')}} aria-label="Ficha" variant='outline' size='xs' icon={<EmailIcon color='gray.500' />} />
              </Tooltip>
              <Tooltip placement="top" hasArrow label='Reestablecer clave'>
                <IconButton onClick={()=>{openModal(e,'password')}} aria-label="Ficha" variant='outline' size='xs' icon={<PlusSquareIcon color='gray.500' />} />
              </Tooltip>
            </Stack>
          )}
        />

      </Table>);
}

export default TablaClientes;