import { OrdinalNumberPipe } from '@pipes/ordinal-number.pipe';

describe('OrdinalNumberPipe', () => {
  const pipe = new OrdinalNumberPipe();

  it('transform should return proper index value', () => {
    expect(pipe.transform(0, 0, 10)).toBe(1);

    expect(pipe.transform(5, 1, 20)).toBe(26);
  });
});
