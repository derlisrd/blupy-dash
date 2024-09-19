import { ChakraProvider } from '@chakra-ui/react'
import Pages from './pages/pages'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './providers/theme_provider'

function App() {
  
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
