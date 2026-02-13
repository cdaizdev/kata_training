const validateID = require('./validateId.js');

describe('Warehouse ID Validation (Business Rules)', () => {
  
  const testCases = [
    ["User_123",      true,  "valid standard ID"],
    ["valid_ID_123",  true,  "valid ID with underscores"],
    ["1_user",        false, "starts with a digit"],
    ["abc",           false, "length below minimum threshold (< 5)"],
    ["abffasf879345__52345_234_fasffasdfc", false, "length exceeds maximum limit (> 15)"],
    ["admin_123_",    false, "trailing underscore at the end"],
    ["admin_-123_",   false, "contains hyphen and trailing underscore"],
    ["user!name",     false, "contains invalid special character (! )"],
    ["admin#2024",    false, "contains invalid special character (#)"],
    ["con espacios",  false, "contains forbidden whitespace"],
    ["@usuario",      false, "starts with a special character"],
    ["",              false, "empty string input"],
  ];

  test.each(testCases)(
    'Should return %p for input: "%s" (%s)',
    (input, expected, description) => {
      expect(validateID(input)).toBe(expected);
    }
  );
});