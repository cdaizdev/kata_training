const parseInventory = require('./inventoryParser.js');

describe('Inventory Parser Logic', () => {

    test('should correctly parse a standard list of valid products', () => {
        const data = [
            "Laptop:5:1000",
            "Mouse:10:25",
            "Webcam:2:50"
        ];
        const result = parseInventory(data);

        expect(result.count).toBe(3);
        expect(result.totalValue).toBe(5350); // (5*1000) + (10*25) + (2*50)
        expect(result.products).toContainEqual({ "name": "laptop", "price": 1000, "quantity": 5 });
    });

    test('should clean product names (lowercase, trim, and replace spaces with underscores)', () => {
        const data = ["  Gamer Mouse  :1:50"];
        const result = parseInventory(data);

        expect(result.products[0].name).toBe("gamer_mouse");
    });

    test('should ignore products with invalid quantity or price (NaN)', () => {
        const data = [
            "Keyboard:abc:50",
            "Monitor:5:free",
            "Headset:10:100"
        ];
        const result = parseInventory(data);

        expect(result.count).toBe(1);
        expect(result.products[0].name).toBe("headset");
    });

    test('should ignore products with negative values', () => {
        const data = [
            "Chair:-1:100",
            "Desk:1:-50",
            "Lamp:1:20"
        ];
        const result = parseInventory(data);

        expect(result.count).toBe(1);
        expect(result.totalValue).toBe(20);
    });

    test('should handle an empty array or null input', () => {
        const expectedEmpty = { products: [], totalValue: 0, count: 0 };

        expect(parseInventory([])).toEqual(expectedEmpty);
        expect(parseInventory(null)).toEqual(expectedEmpty);
    });

    test('should handle multiple spaces between words in product names', () => {
        const data = ["Ultra    Wide   Monitor:1:500"];
        const result = parseInventory(data);

        expect(result.products[0].name).toBe("ultra_wide_monitor");
    });
});