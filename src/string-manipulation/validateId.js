/** 
 * En Odoo, los productos suelen tener códigos internos. Tu tarea es escribir una función validateID(str) 
 * que determine si un código es válido según estas 4 reglas:
 * Longitud: Debe tener entre 5 y 15 caracteres.
 * Inicio: Debe empezar obligatoriamente con una letra (mayúscula o minúscula).
 * Contenido: Solo puede contener letras, números y el carácter guion bajo (_).
 * Final: NO puede terminar en guion bajo (_).
 */

function validateID(str) {
    const requirements = [/^[a-zA-Z]/, /^[a-zA-Z0-9_]+$/, /[^_]$/];
    
    return requirements.every(item => item.test(str)) && str.length > 5 && str.length < 15;
}
module.exports = validateID;