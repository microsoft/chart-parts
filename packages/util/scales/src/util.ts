/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

export function optionalArgument<T>(
	value: T | undefined,
	argLength: number,
	defaultWithoutArg: T,
	defaultWithArg: T,
): T {
	return argLength === 0
		? defaultWithoutArg
		: value === undefined
		? defaultWithArg
		: value
}
