import { useMemo, DependencyList } from 'react'
import { computed, IComputedValueOptions } from 'mobx'

export interface Computed<T> {
	(): T
}

export function useComputed<T>(reducer: () => T, options: IComputedValueOptions<T>, deps: DependencyList): Computed<T>
export function useComputed<T>(reducer: () => T, options: IComputedValueOptions<T>): Computed<T>
export function useComputed<T>(reducer: () => T, deps: DependencyList): Computed<T>
export function useComputed<T>(reducer: () => T): Computed<T>
export function useComputed<T>(reducer: () => T, ...args: unknown[]) {
	let options = {} as IComputedValueOptions<T>
	let deps = [] as DependencyList

	for (const arg of args) {
		if (Array.isArray(arg)) {
			deps = arg as DependencyList
		} else {
			options = arg as IComputedValueOptions<T>
		}
	}

	return useMemo(() => {
		const atom = computed<T>(reducer, options)

		return () => atom.get() as Computed<T>
	}, deps)
}
