// Author: Rahul Hegde
// Date: 3/13/2022

const Counter = require('../lib/Counter.js')

/*
const counter = new Counter(); --> 00:00:00 AM
const counter = new Counter(HH, MM, SS, 'AM' | 'PM'); --> HH:MM:SS AM|PM, default to AM

counter.increment(); --> +1 second
counter.decrement(); --> -1 second

counter.increment('h' | 'm' | 's'); --> +1 hour | +1 minute | +1 second
counter.decrement('h' | 'm' | 's'); --> -1 hour | -1 minute | -1 second

counter.getTime();        --> HH:MM:SS AM|PM  *00 <= HH <= 12
counter.getMilitaryTime() --> HH:MM:SS        *00 <= HH <= 24
  */

// console.log(helpers.getRandomNumber(1, 5))
// console.log(helpers.getRandomInt(1, 5))

//----------------------------------
// Creation and Initialization Tests
//----------------------------------
describe('Creation and Initialization Tests', () => {
  let counter
  beforeEach(() => {
    counter = new Counter()
  })

  it('exists', () => {
    expect(counter).not.toBeUndefined()
  })
  it('has default constructor and can retrieve hour, minute, and second reading individually', () => {
    expect(counter.getHour()).toBe(0)
    expect(counter.getMinute()).toBe(0)
    expect(counter.getSecond()).toBe(0)
  })
  it('has initializer constructor', () => {
    counter = new Counter(12, 35, 39)
    expect(counter).not.toBeUndefined()
    expect(counter.getHour()).toBe(12)
    expect(counter.getMinute()).toBe(35)
    expect(counter.getSecond()).toBe(39)
  })
})

//----------------------------------
// Display Style Tests
//----------------------------------
describe('Display Style Tests', () => {
  it('can display time in standard time string', () => {
    // standard morning
    let counter = new Counter(2, 15, 36)
    expect(counter.getTime()).toEqual('02:15:36 AM')

    // standard morning explicit am
    counter = new Counter(2, 18, 36, 'am')
    expect(counter.getTime()).toEqual('02:18:36 AM')

    // standard evening
    counter = new Counter(11, 38, 36, 'pm')
    expect(counter.getTime()).toEqual('11:38:36 PM')

    // military to standard
    counter = new Counter(23, 38, 36, '', true)
    expect(counter.getTime()).toEqual('11:38:36 PM')

    // wrapped input to standard
    counter = new Counter(23, 38, 36)
    expect(counter.getTime()).toEqual('11:38:36 AM')
  })

  it('can display time in military time string', () => {
    // standard morning
    let counter = new Counter(2, 15, 36)
    expect(counter.getMilitaryTime()).toEqual('02:15:36')

    // standard morning explicit am
    counter = new Counter(2, 18, 36, 'am')
    expect(counter.getMilitaryTime()).toEqual('02:18:36')

    // standard evening
    counter = new Counter(11, 38, 36, 'pm')
    expect(counter.getMilitaryTime()).toEqual('23:38:36')

    // military to standard
    counter = new Counter(23, 38, 36, '', true)
    expect(counter.getMilitaryTime()).toEqual('23:38:36')

    // wrapped input to standard
    // (this shout correct input around 12 as pivot then convert to military)
    counter = new Counter(23, 38, 36)
    expect(counter.getMilitaryTime()).toEqual('11:38:36')
  })
})

//----------------------------------
// Increment and Decrement Tests
//----------------------------------
describe('Increment and Decrement Tests', () => {
  let counter
  beforeEach(() => {
    counter = new Counter()
  })

  it('has default increment of 1 second', () => {
    // normal increment
    counter.increment()
    expect(counter.getTime()).toEqual('00:00:01 AM')
    expect(counter.getMilitaryTime()).toEqual('00:00:01')
  })
  it('can increment hour', () => {
    counter.increment('h')
    expect(counter.getTime()).toEqual('01:00:00 AM')
    expect(counter.getMilitaryTime()).toEqual('01:00:00')
  })
  it('can increment minute', () => {
    counter.increment('m')
    expect(counter.getTime()).toEqual('00:01:00 AM')
    expect(counter.getMilitaryTime()).toEqual('00:01:00')
  })
  it('can increment second', () => {
    counter.increment('s')
    expect(counter.getTime()).toEqual('00:00:01 AM')
    expect(counter.getMilitaryTime()).toEqual('00:00:01')
  })

  it('has default decrement of 1 second', () => {
    counter.decrement()
    expect(counter.getTime()).toEqual('11:59:59 PM')
    expect(counter.getMilitaryTime()).toEqual('23:59:59')
  })
  it('can decrement hour', () => {
    counter.decrement('h')
    expect(counter.getTime()).toEqual('11:00:00 PM')
    expect(counter.getMilitaryTime()).toEqual('23:00:00')
  })
  it('can decrement minute', () => {
    counter.decrement('m')
    expect(counter.getTime()).toEqual('11:59:00 PM')
    expect(counter.getMilitaryTime()).toEqual('23:59:00')
  })
  it('can decrement second', () => {
    counter.decrement('s')
    expect(counter.getTime()).toEqual('11:59:59 PM')
    expect(counter.getMilitaryTime()).toEqual('23:59:59')
  })
})

//----------------------------------
// Time Wrapping Tests
//----------------------------------
describe('Time Wrapping Tests', () => {
  it('makes hour wrap from 24 to 00', () => {
    // initialize in military
    let counter = new Counter(23, 0, 0, '', true)
    expect(counter.getTime()).toEqual('11:00:00 PM')
    expect(counter.getMilitaryTime()).toEqual('23:00:00')

    counter.increment('h')
    expect(counter.getTime()).toEqual('00:00:00 AM')
    expect(counter.getMilitaryTime()).toEqual('00:00:00')

    // same test but initialize in standard
    counter = new Counter(11, 0, 0, 'pm')
    expect(counter.getTime()).toEqual('11:00:00 PM')
    expect(counter.getMilitaryTime()).toEqual('23:00:00')

    counter.increment('h')
    expect(counter.getTime()).toEqual('00:00:00 AM')
    expect(counter.getMilitaryTime()).toEqual('00:00:00')
  })

  it('makes minute wrap from 60 to 00', () => {
    // initialize in military
    let counter = new Counter(22, 59, 0, '', true)
    expect(counter.getTime()).toEqual('10:59:00 PM')
    expect(counter.getMilitaryTime()).toEqual('22:59:00')

    counter.increment('m')
    expect(counter.getTime()).toEqual('11:00:00 PM')
    expect(counter.getMilitaryTime()).toEqual('23:00:00')

    // same test but initialize in standard
    counter = new Counter(9, 59, 0, 'pm')
    expect(counter.getTime()).toEqual('09:59:00 PM')
    expect(counter.getMilitaryTime()).toEqual('21:59:00')

    counter.increment('m')
    expect(counter.getTime()).toEqual('10:00:00 PM')
    expect(counter.getMilitaryTime()).toEqual('22:00:00')
  })

  it('makes second wrap from 60 to 00', () => {
    // initialize in military
    let counter = new Counter(5, 31, 59, '', true)
    expect(counter.getTime()).toEqual('05:31:59 AM')
    expect(counter.getMilitaryTime()).toEqual('05:31:59')

    counter.increment('s')
    expect(counter.getTime()).toEqual('05:32:00 AM')
    expect(counter.getMilitaryTime()).toEqual('05:32:00')

    // same test but initialize in standard
    counter = new Counter(5, 31, 59, 'am')
    expect(counter.getTime()).toEqual('05:31:59 AM')
    expect(counter.getMilitaryTime()).toEqual('05:31:59')

    counter.increment('s')
    expect(counter.getTime()).toEqual('05:32:00 AM')
    expect(counter.getMilitaryTime()).toEqual('05:32:00')
  })
})

//----------------------------------
// Looping Increment / Decrement Tests
//----------------------------------
describe('Looping Increment / Decrement Tests', () => {
  it('conforms to standard increments after many loops', () => {
    let counter = new Counter()

    // break over 1 min
    for (let i = 0; i < 63; i++) {
      counter.increment()
    }
    expect(counter.getTime()).toEqual('00:01:03 AM')

    // break over 1 hour
    counter = new Counter()
    for (let i = 0; i < 3602; i++) {
      counter.increment()
    }
    expect(counter.getTime()).toEqual('01:00:02 AM')

    // break past noon
    counter = new Counter()
    for (let i = 0; i < 3601 * 12; i++) {
      counter.increment()
    }
    expect(counter.getTime()).toEqual('12:00:12 PM')

    // break past 24 hours
    counter = new Counter()
    for (let i = 0; i < 3601 * 24; i++) {
      counter.increment()
    }
    expect(counter.getTime()).toEqual('00:00:24 AM')
  })
  it('conforms to standard decrements after many loops', () => {
    let counter = new Counter()

    // break over 1 min
    for (let i = 0; i < 63; i++) {
      counter.decrement()
    }
    expect(counter.getTime()).toEqual('11:58:57 PM')

    // break over 1 hour
    counter = new Counter()
    for (let i = 0; i < 3602; i++) {
      counter.decrement()
    }
    expect(counter.getTime()).toEqual('10:59:58 PM')

    // break past noon
    counter = new Counter()
    for (let i = 0; i < 3601 * 12; i++) {
      counter.decrement()
    }
    expect(counter.getTime()).toEqual('11:59:48 AM')

    // break past 24 hours
    counter = new Counter()
    for (let i = 0; i < 3601 * 24; i++) {
      counter.decrement()
    }
    expect(counter.getTime()).toEqual('11:59:36 PM')
  })
})
