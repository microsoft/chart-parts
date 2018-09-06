export function optionalArgument<T>(
	value: T | undefined,
	argLength: number,
	defaultWithoutArg: T,
	defaultWithArg: T,
) {
	return argLength === 0
		? defaultWithoutArg
		: value === undefined
			? defaultWithArg
			: value
}
