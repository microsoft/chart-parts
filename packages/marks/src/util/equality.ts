const shallowequal = require('shallowequal')

export interface ShallowEqualOptions {
	exclude?: string[]
	nest?: string[]
}

/**
 * Shallow-equality check with bells & whistles for masking and
 * nesting equality checks
 *
 * @param a The first value
 * @param b The second value
 * @param param2 The equality options
 */
export function shallowEqual<T extends object>(
	a: T,
	b: T,
	{ exclude = [], nest = [] }: ShallowEqualOptions = {},
) {
	const mask = [...exclude, ...nest].reduce((prev: any, curr: string) => {
		prev[curr] = undefined
		return prev
	}, {})
	const masked = (v: T) => ({ ...(v as any), ...mask })

	// Check the non-masked, non nested values
	if (!shallowequal(masked(a), masked(b))) {
		return false
	}

	// Execute the nested shallow-equals
	for (const key of nest) {
		const aVal: any = (a as any)[key]
		const bVal: any = (b as any)[key]
		if (!shallowequal(aVal, bVal)) {
			return false
		}
	}

	return true
}

export function areSetsEqual<T>(s1: Set<T>, s2: Set<T>) {
	if (s1.size !== s2.size) {
		return false
	}
	for (const a of s1 as any) {
		if (!s2.has(a)) {
			return false
		}
	}
	return true
}

export function areMapsEqual<K, V>(m1: Map<K, V>, m2: Map<K, V>) {
	if (m1.size !== m2.size) {
		return false
	}
	for (const [key, value] of m1 as any) {
		if (!m2.has(key)) {
			return false
		}
		if (!m2.get(key) === value) {
			return false
		}
	}
	return true
}

export function areArraysEqual<T>(
	current: T[] | null | undefined,
	next: T[] | null | undefined,
	areEqual: (left: T, right: T) => boolean = (left, right) => left === right,
) {
	if (current === next) {
		return true
	}
	if (!current || !next) {
		return false
	}
	return (
		current.length === next.length &&
		current.every((c, index) => areEqual(c, next[index]))
	)
}
