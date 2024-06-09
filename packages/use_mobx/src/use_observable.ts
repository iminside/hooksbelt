import { useMemo, DependencyList } from 'react'
import { observable, runInAction, CreateObservableOptions } from 'mobx'

export interface Observable<T> {
	(): T
	(v: T): void
}

export function useObservable<T>(value: T, options: CreateObservableOptions, deps: DependencyList): Observable<T>
export function useObservable<T>(value: T, options: CreateObservableOptions): Observable<T>
export function useObservable<T>(value: T, deps: DependencyList): Observable<T>
export function useObservable<T>(value: T): Observable<T>
export function useObservable<T>(value: T, ...args: unknown[]) {
	let options = {} as CreateObservableOptions
	let deps = [] as DependencyList

	for (const arg of args) {
		if (Array.isArray(arg)) {
			deps = arg as DependencyList
		} else {
			options = arg as CreateObservableOptions
		}
	}

	return useMemo(() => {
		const atom = observable.box<T>(value, { deep: false, ...options })

		return ((...args: [] | [T]) => {
			if (args.length === 0) {
				return atom.get()
			} else {
				runInAction(() => atom.set(args[0]))
				return
			}
		}) as Observable<T>
	}, deps)
}
