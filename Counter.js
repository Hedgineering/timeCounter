// Author: Rahul Hegde
// Date: 3/13/2022

/* 
  The CounterProto is used effectively as an IIFE built based on the user parameters,
  An IIFE (immediately invoked function expression) must be used
  because, though inefficient, it will hide the 
  _hour, _minute, and _second, attributes as though they were private.

  Since JavaScript does not yet have a widely supported native implementation
  of the 'private' keyword as other languages like Java and C++ do, this is 
  how we can hide our internal variables from end users.

  There may be a better way of doing this, but that can be refactored upon review.
*/
let CounterProto = function (hr, min, sec) {
  // private members
  let _hour = hr
  let _minute = min
  let _second = sec

  const CounterProto = {
    // public members
    increment(target = 's') {
      switch (target) {
        case 's':
          if (_second == 59) {
            _second = 0
            this.increment('m')
          } else {
            _second++
          }
          break

        case 'm':
          if (_minute == 59) {
            _minute = 0
            this.increment('h')
          } else {
            _minute++
          }
          break

        case 'h':
          if (_hour == 23) {
            _hour = 0
          } else {
            _hour++
          }
          break
        default:
          console.log('please enter valid increment target!')
      }
    },
    decrement(target = 's') {
      switch (target) {
        case 's':
          if (_second == 0) {
            _second = 59
            this.decrement('m')
          } else {
            _second--
          }
          break
        case 'm':
          if (_minute == 0) {
            _minute = 59
            this.decrement('h')
          } else {
            _minute--
          }
          break
        case 'h':
          if (_hour == 0) {
            _hour = 23
          } else {
            _hour--
          }
          break
        default:
          console.log('please enter valid decrement target!')
      }
    },
    // setPrivateMember(v) {
    //   _privateMember = v;
    // },
    getHour() {
      return _hour
    },
    getMinute() {
      return _minute
    },
    getSecond() {
      return _second
    },
    getTime() {
      // convert to non-military time
      let hour = _hour > 12 ? _hour - 12 : _hour

      // padding with 0s
      hour = hour < 10 ? '0' + hour : hour
      let min = _minute < 10 ? '0' + _minute : _minute
      let sec = _second < 10 ? '0' + _second : _second

      return `${hour}:${min}:${sec} ${_hour >= 12 ? 'PM' : 'AM'}`
    },
    getMilitaryTime() {
      // padding with 0s
      let hour = _hour < 10 ? '0' + _hour : _hour
      let min = _minute < 10 ? '0' + _minute : _minute
      let sec = _second < 10 ? '0' + _second : _second

      return `${hour}:${min}:${sec}`
    },
  }
  return CounterProto
}

/**
 * Creates a counter initialized to the given parameters.
 * Time considered in AM by default unless specified, and numbers out of range
 * are wrapped around either 24 or 12 hour marks depending on whether the
 * 'military' parameter is true or false
 *
 * @param {Number} hr  Current Hour for the Counter,   0 by default loops back from 23 to 0 if military is true, otherwise from 12 to 1
 * @param {Number} min Current Minute for the Counter, 0 by default
 * @param {Number} sec Current Second for the Counter, 0 by default
 * @param {String} mer AM or PM ; Current Meridian for the Counter, 'AM' by default
 * @param {Boolean} military If this is true, the initializer parameters are considered to be input in military time, and the meridian parameter is disregarded, otherwise input parameters are considered to be in standard time and converted to military time for internal calculation
 */
function createCounter(hr = 0, min = 0, sec = 0, mer = 'AM', military = false) {
  // Running some input validation...
  // to prevent creation of invalid counter

  // In both military and non-military cases, min and sec wrap around 60
  // 60 -> 0, 61 -> 1, etc.
  if (min >= 60) {
    min %= 60
  }
  if (sec >= 60) {
    sec %= 60
  }

  // Consider standard case
  if (!military) {
    // 12 stays as 12, 13 or more wraps around 12 (13 -> 1, 14 -> 2, etc.)
    if (hr > 12) {
      hr %= 12
    }

    // convert to military hours if pm, otherwise assume am
    if (mer === 'PM' || mer === 'pm') {
      hr += 12
    }

    return Object.create(CounterProto(hr, min, sec))
  }

  // Military case hr wraps around 24
  // 24 -> 0, 25 -> 1, etc.
  if (hr >= 24) {
    hr %= 24
  }

  // CounterProto assumes Military Time default
  // so we preprocess the input into Military Time
  return Object.create(CounterProto(hr, min, sec))
}

module.exports = createCounter
