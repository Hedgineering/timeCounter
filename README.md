# Timer Counter

A simple counter library that can increment and decrement hours, minutes, and seconds. This library can generate both standard and military time representations.

All the functionality is protected and cannot be tampered with by end users through the api. 

Even though JavaScript does not natively support private variables (at least not in a manner that has universal browser / environment support),
some clever object prototyping was utilized to hide and protect internal functional variables from users (you can see the Counter.js source code for details).
## Acknowledgements
This counter was made to the specification of the Maxeta Technologies Intern Project as a part of my application to their Software Engineering Internship Program for Summer 2022.

Thank you Mr. Chad Reed and Ms. Pamela Putnam from Maxeta Technologies for the opportunity to compete for your internship position!
## Author: Rahul Hegde

- [Github](https://www.github.com/Hedgineering)
- [Website](https://www.hedgineering.com/)
- [Linkedin](https://www.linkedin.com/in/rahul-anant-hegde/)


## Installation

Quick and Easy: Install my-project with npm!

Assuming you have [node](https://nodejs.org/en/) installed, simply open up your terminal / command prompt in your project root directory and run this command:

```bash
  npm i @hedgineering/time-counter
```

Then, you can simply import the counter and use it like any other object:

```js
const Counter = require('@hedgineering/time-counter')

const counter = new Counter()

console.log(counter.getTime())
console.log(counter.getMilitaryTime())
```

## API Reference

#### Create A Default Counter - 00:00:00 AM or 00:00:00 (military)

```js
  let counter = new Counter()
```

#### Create A Counter Set To A Time - HH:MM:SS AM/PM or HH:MM:SS (military)

```js
  // all of these are equivalent to 05:30:25 AM or 05:30:25 (military)

  let counterA = new Counter(5, 30, 25) // AM by default
  let counterB = new Counter(5, 30, 25, 'am') 
  let counterC = new Counter(5, 30, 25, 'AM')

  // both of these are equivalent to 05:30:25 PM or 17:30:25 (military)

  let counterD = new Counter(5, 30, 25, 'pm') 
  let counterE = new Counter(5, 30, 25, 'PM')

  // meridian is ignored when military is true, this is 22:30:25 or 10:30:25 PM

  let counterF = new Counter(22,30,25, '', true)
```

| Parameter        | Type      | Description                       |
| :--------------- | :-------- | :-------------------------------- |
| `hour`           | `number`  | **Required**. Current Hour for the Counter, 0 by default loops back from 23 to 0 if military is true, otherwise from 12 to 1 |
| `minute`         | `number`  | **Required**. Current Minute for the Counter, 0 by default |
| `second`         | `number`  | **Required**. Current Second for the Counter, 0 by default |
| `meridian`       | `string`  | *Optional*.  AM or PM or am or pm; Current Meridian for the Counter, 'AM' by default |
| `military`       | `boolean` | *Optional*. If this is true, the initializer parameters are considered to be input in military time, and the meridian parameter is disregarded, otherwise input parameters are considered to be in standard time and converted to military time for internal calculation |


#### Get Time in Standard Format HH:MM:SS AM/PM (12 hour clock)

```js
  counterA.getTime() // returns '05:30:25 AM'
```

#### Get Time in Military Format HH:MM:SS (24 hour clock)

```js
  counterD.getMilitaryTime() // returns '17:30:25'
```

#### Increment / Decrement Time

```js
  // default behavior: increments or decrements by 1 second 

  counterA.increment() // 05:30:26 AM
  counterA.decrement() // 05:30:25 AM

  // optionally specify what unit to increment or decrement

  counterA.increment('h') // 06:30:25 AM
  counterA.increment('m') // 06:31:25 AM
  counterA.increment('s') // 06:31:26 AM

  counterA.decrement('h') // 05:30:25 AM
  counterA.decrement('m') // 05:30:25 AM
  counterA.decrement('s') // 05:30:25 AM
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `target`  | `string` | *Optional*. h, m, or s ; the logical boundary target to increment or decrement |




