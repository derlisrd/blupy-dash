export const fechas = {
    months : ()=>
    {
        return [
            { name: 'enero', value: '01' },
            { name: 'febrero', value: '02' },
            { name: 'marzo', value: '03' },
            { name: 'abril', value: '04' },
            { name: 'mayo', value: '05' },
            { name: 'junio', value: '06' },
            { name: 'julio', value: '07' },
            { name: 'agosto', value: '08' },
            { name: 'septiembre', value: '09' },
            { name: 'octubre', value: '10' },
            { name: 'noviembre', value: '11' },
            { name: 'diciembre', value: '12' }
        ];
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