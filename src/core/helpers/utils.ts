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
    },
    getYearsRange: (startYear?: number, endYear?: number) => {
        const currentYear = new Date().getFullYear();
        const start = startYear || currentYear - 5; // Por defecto, 5 años atrás
        const end = endYear || currentYear + 1;     // Por defecto, hasta el próximo año
        
        const years = [];
        for (let year = start; year <= end; year++) {
            years.push({
                name: year.toString(),
                value: year.toString()
            });
        }
        
        return years;
    }
}