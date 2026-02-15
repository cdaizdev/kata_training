const generateMonthlyReport = require('./salesService.js');

describe('generateMonthlyReport - Nivel Medio', () => {

  test('debe agrupar ventas del mismo mes correctamente', () => {
    const sales = [
      { date: '2023-01-05', amount: 100, status: 'completed' },
      { date: '2023-01-20', amount: 50, status: 'completed' },
      { date: '2023-02-10', amount: 200, status: 'completed' }
    ];

    const result = generateMonthlyReport(sales);

    expect(result).toEqual({
      '2023-01': 150,
      '2023-02': 200
    });
  });

  test('debe ignorar ventas que no estén en status "completed"', () => {
    const sales = [
      { date: '2023-05-01', amount: 100, status: 'completed' },
      { date: '2023-05-05', amount: 500, status: 'pending' },
      { date: '2023-05-10', amount: 50, status: 'cancelled' }
    ];

    const result = generateMonthlyReport(sales);

    expect(result).toEqual({
      '2023-05': 100
    });
  });

  test('debe manejar diferentes años', () => {
    const sales = [
      { date: '2022-12-31', amount: 100, status: 'completed' },
      { date: '2023-12-31', amount: 100, status: 'completed' }
    ];

    const result = generateMonthlyReport(sales);

    expect(result).toEqual({
      '2022-12': 100,
      '2023-12': 100
    });
  });

  test('debe devolver un objeto vacío si no hay ventas válidas o el array está vacío', () => {
    expect(generateMonthlyReport([])).toEqual({});
    expect(generateMonthlyReport(null)).toEqual({});
  });

  test('debe manejar fechas con formatos de hora adicionales', () => {
    const sales = [
      { date: '2023-03-15T10:00:00Z', amount: 300, status: 'completed' }
    ];
    const result = generateMonthlyReport(sales);
    expect(result).toEqual({ '2023-03': 300 });
  });
});