function addNumbers(num1, num2) {
  return num1 + num2;
}

describe('addNumbers', () => {
  it('add two numbers', () => {
    expect(addNumbers(2, 2)).toEqual(4);
  });
});
