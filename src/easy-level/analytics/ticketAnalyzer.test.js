const analyzeTickets = require('./ticketAnalyzer.js');

describe('Support Ticket Analyzer', () => {
  const tickets = [
    { id: 1, category: 'technical', status: 'closed', subject: 'Login issue' },
    { id: 2, category: 'billing', status: 'open', subject: 'Invoice URGENT' },
    { id: 3, category: 'technical', status: 'open', subject: 'Bug report' },
    { id: 4, category: 'account', status: 'closed', subject: 'Reset password' },
    { id: 5, category: 'billing', status: 'closed', subject: 'urgent payment' }
  ];

  test('should calculate correct totals and categories', () => {
    const report = analyzeTickets(tickets);

    expect(report.total).toBe(5);
    expect(report.byCategory.technical).toBe(2);
    expect(report.byCategory.billing).toBe(2);
    expect(report.byCategory.account).toBe(1);
  });

  test('should calculate the resolution rate correctly', () => {
    const report = analyzeTickets(tickets);
    // 3 closed out of 5 = 60%
    expect(report.resolutionRate).toBe(60); 
  });

  test('should count urgent tickets regardless of case', () => {
    const report = analyzeTickets(tickets);
    // Ticket 2 and 5 have "URGENT" in subject
    expect(report.urgentCount).toBe(2);
  });

  test('should handle empty input', () => {
    expect(analyzeTickets([])).toEqual({
      total: 0,
      resolutionRate: 0,
      urgentCount: 0,
      byCategory: {}
    });
  });
});