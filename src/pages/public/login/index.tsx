import { Formik, Field } from "formik";
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Input, VStack, useToast } from "@chakra-ui/react";
import { validate } from "../../../utils/validate";
import { APICALLER } from "../../../services/api";
import { useState } from "react";
import { LoadindScreen } from "../../../components";
import userDataHook from "../../../store/user_data_store";

function Login() {
  const { setIsAuth, setDataUser } = userDataHook();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const onsubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    const { success, results, message } = await APICALLER.login(values);
    setLoading(false);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      return false;
    }
    if (results) {
      setDataUser(results);
      setIsAuth(true);
    }
  };

  if (loading) {
    return <LoadindScreen />;
  }
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={onsubmit}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={Input}
                    autoFocus
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    validate={(value: string) => {
                      let error;
                      if (!validate.email(value)) {
                        error = "Ingrese su email";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Clave</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value: string) => {
                      let error;
                      if (value.length < 1) {
                        error = "Ingrese su contraseña";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default Login;
