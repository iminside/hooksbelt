import { useEffect, DependencyList } from 'react'
import { reaction, IReactionOptions } from 'mobx'

export function useReaction<T, FireImmediately extends boolean = false>(
	fn: () => T,
	effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void,
	options: IReactionOptions<T, FireImmediately>,
	deps: DependencyList,
): void
export function useReaction<T, FireImmediately extends boolean = false>(
	fn: () => T,
	effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void,
	options: IReactionOptions<T, FireImmediately>,
): void
export function useReaction<T, FireImmediately extends boolean = false>(
	fn: () => T,
	effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void,
	deps: DependencyList,
): void
export function useReaction<T, FireImmediately extends boolean = false>(
	fn: () => T,
	effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void,
): void
export function useReaction<T, FireImmediately extends boolean = false>(
	fn: () => T,
	effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void,
	...args: unknown[]
) {
	let options = {} as IReactionOptions<T, FireImmediately>
	let deps = [] as DependencyList

	for (const arg of args) {
		if (Array.isArray(arg)) {
			deps = arg as DependencyList
		} else {
			options = arg as IReactionOptions<T, FireImmediately>
		}
	}

	useEffect(() => reaction(fn, effect, options), deps)
}
