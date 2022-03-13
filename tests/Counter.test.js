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
