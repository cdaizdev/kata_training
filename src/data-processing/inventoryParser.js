/**Reto 2: "Inventory Parser" (Procesador de Inventario)
 * Imagina que recibes un array de strings. Cada string contiene información de un 
 * producto en un formato un poco caótico: nombre_del_producto:cantidad:precio.
 * Tu misión: Crear una función parseInventory(data) que transforme ese array en un 
 * objeto resumen.
 * Reglas de negocio:
 *  Limpieza: El nombre del producto debe estar en minúsculas y sin espacios 
 *  (usa guiones bajos si hay espacios).
 *  Validación: Si la cantidad o el precio no son números válidos 
 *  (o son menores a 0), ese producto debe ser ignorado.
 *  Resultado: Debes devolver un objeto que contenga:
 *      - products: Un array de objetos con { name, quantity, price }.
 *      - totalValue: La suma total del valor del inventario (cantidad × precio).
 *      - count: El número total de productos válidos procesados.
 */

function parseInventory(data) {
    const initialState = { count: 0, totalValue: 0, products: [] };

    if (!data || data.length === 0) return initialState;

    return data.reduce((acc, item) => {
        [productName, rawQuantity, rawPrice] = item.split(':');
        const productQuantity = +rawQuantity;
        const productPrice = +rawPrice;

        if (isNaN(productQuantity) || isNaN(productPrice) || productPrice < 0 || productQuantity < 0) return acc;

        const parsedName = productName.toLowerCase().trim().replace(/\s+/g, '_');

        acc.products.push({ name: parsedName, price: productPrice, quantity: productQuantity });
        acc.count++;
        acc.totalValue += productQuantity * productPrice;
        return acc;
    }, initialState);
}

module.exports = parseInventory;