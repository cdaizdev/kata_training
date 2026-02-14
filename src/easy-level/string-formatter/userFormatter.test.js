const formatUserData = require('./userFormatter.js');

describe('formatUserData', () => {
  
  test('debe normalizar nombres y generar usernames correctamente', () => {
    const input = "  mario rossi  ";
    const result = formatUserData(input);
    
    expect(result).toEqual({
      fullName: "Mario Rossi",
      username: "mrossi"
    });
  });

  test('debe manejar formatos de mayúsculas inconsistentes', () => {
    const input = "aNA lOPEZ";
    const result = formatUserData(input);
    
    expect(result.fullName).toBe("Ana Lopez");
    expect(result.username).toBe("alopez");
  });

  test('debe lanzar error si el input es un string vacío o solo espacios', () => {
    expect(() => formatUserData("   ")).toThrow("Invalid input: Name must be a non-empty string");
  });

  test('debe lanzar error si el input no es un string', () => {
    expect(() => formatUserData(null)).toThrow("Invalid input: Name must be a non-empty string");
    expect(() => formatUserData(123)).toThrow("Invalid input: Name must be a non-empty string");
  });

  test('debe funcionar con nombres compuestos (usar solo el primer apellido para el username)', () => {
    const input = "Juan Carlos Perez";
    const result = formatUserData(input);
    
    // Regla: Primera letra del primer nombre + primer apellido
    expect(result.fullName).toBe("Juan Carlos Perez");
    expect(result.username).toBe("jcarlos");
  });
});