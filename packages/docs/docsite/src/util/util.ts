export function randomBetween(minValue: number, maxValue: number): number {
	return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
}
