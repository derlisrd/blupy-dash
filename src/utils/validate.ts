import moment from "moment/moment";

export const validate = {
    email: (input : string)=>{
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(input);
    },
    fechaCorrecta: (fecha : Date )=>{
       return moment(fecha, "DD-MM-YYYY").format("YYYY-MM-DD")
    },
    mayorDeEdad: (fechaNacimiento : Date)=>{
        const fechaActual = moment();
        const fechaNac = moment(fechaNacimiento);
        const edad = fechaActual.diff(fechaNac, 'years');

        if(edad<18 || edad>60){
            return false;
        }

        return true //retorna true o false
    },
    //numeroValido : (n) =>n.match(/^^(\+\d{1,3}|\d{1,3})?\d{3}\d{3}\d{4}$/),        
    soloLetras: (texto : string)=>{
        const letters = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ'\s]+$/;
        return letters.test(texto)
    }
}