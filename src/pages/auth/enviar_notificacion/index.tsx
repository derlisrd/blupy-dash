
import { Container, Text, Input, Button,FormErrorMessage, FormControl, FormLabel } from "@chakra-ui/react";
import { Formik, Form, Field, FormikHelpers} from 'formik';
import { APICALLER } from '../../../services/api';
import userDataHook from "../../../store/user_data_store";
import * as Yup from 'yup';
import swal from "sweetalert";

type enviarNotiFormType = {
    title: string
    text: string
}


function EnviarNotificacion() {
    const {dataUser} = userDataHook()
    const initialValues = {
        title: '',
        text: '',
      };
    
      const validationSchema = Yup.object({
        title: Yup.string().required('Ingrese título'),
        text: Yup.string().min(6, 'Debe tener al menos 6 characters').required('Ingrese descripción'),
      });
    
      const enviar = async({title,text} : enviarNotiFormType, { resetForm }: FormikHelpers<enviarNotiFormType>) => {
        const res = await APICALLER.enviarNotificaciones({title, text, token:dataUser.token})
        if(!res.success){
          swal({title:'Error',icon:'error',  text:'Ocurrio un error'})
          return 
        }
          swal({title:'OK',icon:'success' ,text:'Notificaciones enviadas'}) 
          resetForm()
        };
    return <Container>
        <Text fontSize='2xl'>Enviar notificaciones masivas</Text>

        <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={enviar}
    >
      { ({ isSubmitting,errors,touched,values }) => (
        <Form>
            <FormControl isInvalid={!!errors.title && touched.title}>
                <FormLabel>Título</FormLabel>
                <Field as={Input} name="title" placeholder="Título de notificación" />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl mt={6} isInvalid={!!errors.text && touched.text}>
                <FormLabel>Descripción</FormLabel>
                <Field as={Input} value={values.text} name="text" placeholder="Descripción" />
                <FormErrorMessage>{errors.text}</FormErrorMessage>
            </FormControl>
          <Button mt={16} type="submit" disabled={isSubmitting} colorScheme="blue" width="full">
            Enviar
            </Button>
        </Form>
      )
      }
    </Formik>
    </Container>
}

export default EnviarNotificacion;