import { Observable, Subject } from 'rxjs'

export function numberStream(numbers: number[]): Observable<number> {
	const stream = new Subject<number>()
	let i = 0
	const awaitNextNumber = () => {
		stream.next(numbers[i++])
		if (i < numbers.length) {
			setTimeout(awaitNextNumber, 100)
		} else {
			stream.complete()
		}
	}

	setTimeout(awaitNextNumber, 100)
	return stream
}
