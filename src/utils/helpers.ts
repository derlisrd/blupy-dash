export function formatNumberString(numberString : string) {
    // Convertir la cadena a un número
    const number = parseFloat(numberString.replace(/,/g, ''));
  
    // Verificar si la conversión fue exitosa
    if (isNaN(number)) {
        return 'Número no válido';
    }
  
    // Formatear el número con separadores de miles
    const formattedNumber = number.toLocaleString('es-PY', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

    // Devolver el número formateado con el símbolo de Gs
    return `Gs ${formattedNumber}`;
}