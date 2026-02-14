/**
 * Imagina que el departamento de soporte tiene una lista de tickets de clientes. Cada ticket es 
 * un objeto con un id, una category ("technical", "billing", o "account") y un status 
 * ("open" o "closed").
 * Tu misión: Crear una función analyzeTickets(tickets) que genere un reporte de rendimiento.
 * Reglas de negocio:
 * Agrupación: El resultado debe indicar cuántos tickets hay por cada categoría.
 * Ratio de resolución: Debes calcular el porcentaje de tickets que están "closed" frente al total.
 * Prioridad: Si un ticket tiene la palabra "URGENT" (en cualquier combinación de mayúsculas/
 * minúsculas) 
 * en una propiedad opcional llamada subject, debe contarse en una categoría aparte llamada 
 * urgentCount.
 */

function analyzeTickets(tickets) {
    let report = {
        byCategory: {},
        total: 0,
        urgentCount: 0,
        resolutionRate: 0
    };

    if (!tickets || tickets.length === 0) return report;
    
    const total = tickets.length;

    const summary = tickets.reduce((acc, {category, status, subject}) => {
        acc.byCategory[category] = (acc.byCategory[category] || 0) + 1;
        
        acc.total++;
        
        if (status === 'closed') acc.closedTickets = (acc.closedTickets || 0) + 1;
        if(subject?.toLowerCase().includes('urgent')) acc.urgentCount++;

        return acc;
    }, report);

    summary.resolutionRate = parseFloat(summary.closedTickets/total * 100);
    delete summary.closedTickets;

    return summary;
}

module.exports = analyzeTickets;