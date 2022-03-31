import {describe, expect, it} from 'vitest'
import {addInRing, modulo} from "../src/index.js";

describe('utils tests', () => {
  it('modulo', () => {
    expect(modulo(1,2)).to.equal(1)
    expect(modulo(2,2)).to.equal(0)
    expect(modulo(3,2)).to.equal(1)
    expect(modulo(-1,2)).to.equal(1)
    expect(modulo(-2,2)).to.equal(0)
    expect(modulo(-3,2)).to.equal(1)

    expect(modulo(-42,42)).to.equal(0)
    expect(modulo(-1,42)).to.equal(41)
  })

  it('addInRing', () => {
    expect(addInRing(0,0, 3)).to.equal(0)
    expect(addInRing(1,0, 3)).to.equal(1)
    expect(addInRing(1,1, 3)).to.equal(2)
    expect(addInRing(1,2, 3)).to.equal(0)

    expect(addInRing(3,-1, 3)).to.equal(2)
    expect(addInRing(3,-2, 3)).to.equal(1)
    expect(addInRing(3,-3, 3)).to.equal(0)
    expect(addInRing(3,-4, 3)).to.equal(2)
  })
})
