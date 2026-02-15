/** Inventory consolidation
 * Context
 * You are in charge to develope an E-commerce balance engine. 
 * The system receives a list of warehouse transactions.
 * Some are incoming (IN) and others outgoing (OUT). You must calculate the ending stock and alert 
 * if anything ends in negative value (which would indicate an integrity error or a sale without stock).
 * Business Rules:
 *  Input: An array of objects with this format:
 *      {id: 1, sku: 'LAPTOP-01', quantity: 10, type: 'IN' }.
 * 
 * Processing:
 *  IN: Adds to stock.
 *  OUT: Removes remaining stock.
 *  Output: An object with two properties:
 *      stock: An object where the keys are the SKUs and the values ​​are the accumulated total.
 *      critical: An array with the SKUs whose ending stock is less than 0.
 * 
 * Validation: If a transaction does not have a valid type (IN/OUT) or the quantity is not a positive number,
 * that transaction must be ignored.
 */

function consolidateInventory(transactions) {
    //1 format validation
    if (!transactions || transactions.length === 0 || !Array.isArray(transactions))
        return  { stock: {}, critical: []};
    
    const inventory = transactions.reduce((acc, {sku, qty, type}) => {
        //2. Integrity test
        if(typeof qty !== 'number' || qty < 0 || !['IN', 'OUT'].includes(type)) return acc;

        //3. Calculations
        const currentStock = acc.stock[sku] || 0;
        const adjustment = type === 'IN' ? qty : -qty;
        acc.stock[sku] = currentStock + adjustment;
        
        return acc;
    }, { stock: {}, critical: []});

    //4. Critical validation
    inventory.critical = Object.keys(inventory.stock).filter(item => inventory.stock[item] < 0);

    return inventory;
}

module.exports = consolidateInventory;