import { useMemo, DependencyList } from 'react'

export interface Box<T> {
	(): T
	(v: T): void
}

export function useBox<T>(value: T, deps = [] as DependencyList) {
	return useMemo(() => {
		return ((...args: [] | [T]) => {
			if (args.length === 0) {
				return value
			} else {
				value = args[0]
				return
			}
		}) as Box<T>
	}, deps)
}
