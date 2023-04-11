
import { of, Observable, interval, take } from 'rxjs';
import { map, filter, findIndex, reduce } from 'rxjs/operators';

// const observable = new Observable(subscriber => {
//   subscriber.next(1)
//   subscriber.next(2)
//   subscriber.next(3)
//   setTimeout(() => {
//     subscriber.next(4)
//     subscriber.complete()
//   }, 1000)

// })

// observable.subscribe({
//   next: (value) => {
//     console.log(value)
//   }
// })

const subs = interval(500).pipe(map(v => ({ num: v })), filter(v => (v.num % 2 === 0))).subscribe((value) => {
  console.log(value)
  if (value.num === 10) {
    subs.unsubscribe()
  }
})