import { Button, Container, Input, Stack, Text } from "@chakra-ui/react";
import useVendedorHook from "./hook";

function Vendedores() {
  const {form,setForm,ingresar} = useVendedorHook()

  return (
    <Container>
      <Text>Vendedores</Text>
      <Stack>
        <Input placeholder="Cedula" onChange={(e)=>{ setForm({...form,'cedula':e.target.value})}} value={form.cedula}/>
        <Input placeholder="Nombre" onChange={(e)=>{ setForm({...form,'nombre':e.target.value})}} value={form.nombre}/>
        <Input placeholder="Punto" onChange={(e)=>{ setForm({...form,'punto':e.target.value})}} value={form.punto}/>
        <Button onClick={ingresar}>Ingresar</Button>
      </Stack>
    </Container>
  );
}

export default Vendedores;
