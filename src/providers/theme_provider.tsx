import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat"
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { tableAnatomy } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
// define the part you're going to style
table:{
  fontSize:10,
},
thead:{
  fontSize:10
},
th:{
  fontSize:'10px !important',
  padding:'2px 4px !important'
},
td: {
  fontSize:11,
  padding:'6px 4px !important'
},
tr:{
  padding:0
},
})

const tableTheme = defineMultiStyleConfig({ baseStyle })

const theme = extendTheme({
  
  components: {
    Table: tableTheme,
    Button: {
      baseStyle: {
        textTransform: "uppercase",
      },
    },
  },
  baseStyle:{
    
  },

  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`, 
  },
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});



export { theme };
