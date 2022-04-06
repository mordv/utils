import { describe, expect, it } from 'vitest';
import { addInRing, mapRange, modulo, optional } from '../src/index.js';

type TestOptionalType = { a: number; b?: string } | null | undefined;
describe('utils tests', () => {
  it('modulo', () => {
    expect(modulo(1, 2)).to.equal(1);
    expect(modulo(2, 2)).to.equal(0);
    expect(modulo(3, 2)).to.equal(1);
    expect(modulo(-1, 2)).to.equal(1);
    expect(modulo(-2, 2)).to.equal(0);
    expect(modulo(-3, 2)).to.equal(1);

    expect(modulo(-42, 42)).to.equal(0);
    expect(modulo(-1, 42)).to.equal(41);
  });

  it('addInRing', () => {
    expect(addInRing(0, 0, 3)).to.equal(0);
    expect(addInRing(1, 0, 3)).to.equal(1);
    expect(addInRing(1, 1, 3)).to.equal(2);
    expect(addInRing(1, 2, 3)).to.equal(0);

    expect(addInRing(3, -1, 3)).to.equal(2);
    expect(addInRing(3, -2, 3)).to.equal(1);
    expect(addInRing(3, -3, 3)).to.equal(0);
    expect(addInRing(3, -4, 3)).to.equal(2);
  });

  it('map range', () => {
    expect(mapRange(0.5, [0, 1], [0, 3])).to.equal(1.5);
    expect(mapRange(0.5, [0, 1], [0, 2])).to.equal(1);
    expect(mapRange(0.75, [0, 1], [0, 100])).to.equal(75);
    expect(mapRange(2, [0, 10], [0, 100])).to.equal(20);
    expect(mapRange(1, [0, 1], [0, 10])).to.equal(10);
    expect(mapRange(0, [0, 1], [0, 424242])).to.equal(0);
  });

  it('optional type', () => {
    expect(
      optional(null as TestOptionalType)
        .map((v) => v.a)
        .get()
    ).to.equal(null);
    expect(
      optional(undefined as TestOptionalType)
        .map((v) => v.a)
        .get()
    ).to.equal(undefined);
    expect(
      optional({ a: 1 } as TestOptionalType)
        .map((v) => v.a)
        .map((a) => a + 1)
        .get()
    ).to.equal(2);
  });
});
