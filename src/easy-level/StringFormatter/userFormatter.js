/**Formateador de Nómina (Nivel Básico)
 * Contexto Real:
 * Estamos migrando datos de un sistema antiguo a nuestro nuevo módulo de Recursos Humanos.
 * Los nombres de los empleados vienen con espacios extra y en formatos 
 * inconsistentes (mayúsculas/minúsculas). Además, necesitamos generar un username corporativo 
 * automáticamente.
 * Reglas de Negocio:
 * Limpieza: Debes eliminar los espacios en blanco al inicio y al final de los nombres.
 * Normalización: El nombre completo debe devolverse en formato "Title Case" 
 * (Ejemplo: "jUAN pÉreZ" -> "Juan Pérez").
 * Generación de Username: El nombre de usuario será la inicial del nombre seguida del primer 
 * apellido, todo en minúsculas (Ejemplo: "Juan Perez" -> "jperez").
 * Validación: Si el nombre está vacío o no es un string, la función debe lanzar un error 
 * con el mensaje: "Invalid input: Name must be a non-empty string".
 */

function formatUserData(input) {
    if(!input || /^\s+$/g.test(input) || typeof input !== 'string')
        throw new Error("Invalid input: Name must be a non-empty string");

    const parsedInput = input.trim().toLowerCase();
    return {
        fullName: parsedInput.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' '),
        username: parsedInput.charAt(0) + parsedInput.split(' ').map(item => item.charAt(0).toLowerCase() + item.slice(1))[1]
    };
}

module.exports = formatUserData;