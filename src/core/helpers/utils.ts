export const utils = {
    getMonthFormatMM : ()=>{
        const fechaActual = new Date();
        const mesNumero = fechaActual.getMonth() + 1;
        const mesFormateado = mesNumero.toString().padStart(2, '0')
        return mesFormateado
    },
    getYearFormatYYYY: ()=>{
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        return anio.toString()
    }
}