const consolidateInventory =  require('./inventory.js');

describe('consolidateInventory - Nivel Medio', () => {
  
  test('debe calcular el stock neto de múltiples productos', () => {
    const transactions = [
      { sku: 'IPHONE', qty: 10, type: 'IN' },
      { sku: 'IPHONE', qty: 2, type: 'OUT' },
      { sku: 'MACBOOK', qty: 5, type: 'IN' },
      { sku: 'IPHONE', qty: 1, type: 'OUT' },
    ];

    const result = consolidateInventory(transactions);

    expect(result.stock).toEqual({
      IPHONE: 7,
      MACBOOK: 5
    });
    expect(result.critical).toEqual([]);
  });

  test('debe detectar productos con stock negativo (critical)', () => {
    const transactions = [
      { sku: 'MOUSE', qty: 5, type: 'IN' },
      { sku: 'MOUSE', qty: 10, type: 'OUT' }, // Queda en -5
      { sku: 'TECLADO', qty: 2, type: 'IN' }
    ];

    const result = consolidateInventory(transactions);

    expect(result.stock.MOUSE).toBe(-5);
    expect(result.critical).toContain('MOUSE');
  });

  test('debe ignorar transacciones inválidas (tipos erróneos o qty negativa)', () => {
    const transactions = [
      { sku: 'TABLET', qty: 10, type: 'IN' },
      { sku: 'TABLET', qty: -5, type: 'OUT' }, // Qty negativa es inválida
      { sku: 'TABLET', qty: 2, type: 'REFUND' }, // Tipo no soportado
    ];

    const result = consolidateInventory(transactions);

    expect(result.stock.TABLET).toBe(10);
  });

  test('debe manejar un array vacío', () => {
    const result = consolidateInventory([]);
    expect(result).toEqual({ stock: {}, critical: [] });
  });
});