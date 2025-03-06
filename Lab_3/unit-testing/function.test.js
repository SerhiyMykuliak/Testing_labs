import { fromCharCode, padStart, padEnd } from './function'; 

describe('fromCharCode', () => {
  test('should return correct char from a Unicode number', () => {
    expect(fromCharCode(65)).toBe("A")
    expect(fromCharCode(66)).toBe("B")
    expect(fromCharCode(32111)).toBe("絯")
  })

  test('should return correct char from a UTF-16 code unit', () =>{
    expect(fromCharCode(0x2665)).toBe('♥')
    expect(fromCharCode(0x269B)).toBe('⚛')
  })

  describe('padStart', () => {
    test('should pad the string at the start with specified chars', () =>{
      expect(padStart("lo", 5, "Hel")).toBe("Hello")
      expect(padStart("lake", 10, "~")).toBe("~~~~~~lake")
    })

    test('should return an unchanged string if the length is sufficient', () =>{
      expect(padStart("Hello", 5, "!")).toBe("Hello")
      expect(padStart("cycle", 3, "Motor")).toBe("cycle")
    })
  })

  describe('padEnd', () => {
    test('should pad the string at the end with specified chars', () =>{
      expect(padEnd("4", 5, "0")).toBe("40000")
      expect(padEnd("Motor", 10, "cycle")).toBe("Motorcycle")
    })

    test('should return an unchanged string if the length is sufficient', () =>{
      expect(padEnd("Hello", 5, "!!")).toBe("Hello")
      expect(padEnd("cycle", 3, "Motor")).toBe("cycle")
    })
  })
  
})

