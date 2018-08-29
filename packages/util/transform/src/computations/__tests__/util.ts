import { Observable, Subject } from 'rxjs'

export function stream<T>(items: T[]): Observable<T> {
	const result = new Subject<T>()
	let i = 0
	const awaitNextNumber = () => {
		result.next(items[i++])
		if (i < items.length) {
			setTimeout(awaitNextNumber, 100)
		} else {
			result.complete()
		}
	}

	setTimeout(awaitNextNumber, 100)
	return result
}
