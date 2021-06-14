const { tz_parseTimeParam } = require('../features/timezones.js');

describe('Testing timezone.js : tz_parseTimeParam : typeA_all format',() => {
  let result
  it ('recognises common typeA_all inputs', () => {
    result = tz_parseTimeParam("-3h15m")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_all")
    result = tz_parseTimeParam("4h7m")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_all")
    result = tz_parseTimeParam("-8h30m")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_all")
  })

  it ('recognises uncommon typeA_all inputs', () => {
    result = tz_parseTimeParam("00h")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_hours")
    result = tz_parseTimeParam("0h")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_hours")
    result = tz_parseTimeParam("-0h")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_hours")
  })
  it ('rejects invalid format typeA_all inputs', () => {
    result = tz_parseTimeParam("375h8m")
    expect(result.valid).toBe(false)
    expect(result.type).toBe("invalid")
    result = tz_parseTimeParam("-30000024h8m")
    expect(result.valid).toBe(false)
    expect(result.type).toBe("invalid")
  })
  it ('rejects invalid characters typeA_all inputs', () => {
    result = tz_parseTimeParam("foobar")
    expect(result.valid).toBe(false)
    expect(result.type).toBe("invalid")
    result = tz_parseTimeParam("Hello World!!!")
    expect(result.valid).toBe(false)
    expect(result.type).toBe("invalid")
    result = tz_parseTimeParam("!@#$%^&*()_&^%$")
    expect(result.valid).toBe(false)
    expect(result.type).toBe("invalid")
  })
})

describe('Testing timezone.js : tz_parseTimeParam : typeA_hours format',() => {
  let result
  it ('recognises common typeA_hours inputs', () => {
    result = tz_parseTimeParam("-7h")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_hours")
  })
  it ('recognises uncommon typeA_hours inputs', () => {
    result = tz_parseTimeParam("00h")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_hours")
    result = tz_parseTimeParam("0h")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_hours")
    result = tz_parseTimeParam("-0h")
    expect(result.valid).toBe(true)
    expect(result.type).toBe("typeA_hours")
  })

  it ('rejects uncommon typeA_hours inputs', () => {
    result = tz_parseTimeParam("--9h")
    expect(result.valid).toBe(false)
    expect(result.type).toBe("invalid")
  })
})


describe('Testing timezone.js : tz_parseTimeParam : typeA_minutes format',() => {
  let result
  it ('recognises common typeA_minutes inputs', () => {
  })
  it ('recognises uncommon typeA_minutes inputs', () => {
  })
  it ('rejects invalid typeA_minutes inputs', () => {
  })
})

describe('Testing timezone.js : tz_parseTimeParam : typeB_all format',() => {
  let result
  it ('recognises common typeB_all inputs', () => {
  })
  it ('recognises uncommon typeB_all inputs', () => {
  })
  it ('rejects invalid typeB_all inputs', () => {
  })
})

describe('Testing timezone.js : tz_parseTimeParam : typeB_hours format',() => {
  let result
  it ('recognises common typeB_hours inputs', () => {
  })
  it ('recognises uncommon typeB_hours inputs', () => {
  })
  it ('rejects invalid typeB_hours inputs', () => {
  })
})

describe('Testing timezone.js : tz_parseTimeParam : typeC_all format',() => {
  let result
  it ('recognises common typeC_all inputs', () => {
  })
  it ('recognises uncommon typeC_all inputs', () => {
  })
  it ('rejects invalid typeC_all inputs', () => {
  })
})