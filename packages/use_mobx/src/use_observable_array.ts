import { useMemo, DependencyList } from 'react'
import { observable, CreateObservableOptions, IObservableArray } from 'mobx'

export interface ObservableArray<T> extends IObservableArray<T> {}

export function useObservableArray<T>(
	initialValues: T[],
	options: CreateObservableOptions,
	deps: DependencyList,
): ObservableArray<T>
export function useObservableArray<T>(initialValues: T[], options: CreateObservableOptions): ObservableArray<T>
export function useObservableArray<T>(initialValues: T[], deps: DependencyList): ObservableArray<T>
export function useObservableArray<T>(initialValues: T[]): ObservableArray<T>
export function useObservableArray<T>(): ObservableArray<T>
export function useObservableArray<T>(initialValues?: T[], ...args: unknown[]) {
	let options = {} as CreateObservableOptions
	let deps = [] as DependencyList

	for (const arg of args) {
		if (Array.isArray(arg)) {
			deps = arg as DependencyList
		} else {
			options = arg as CreateObservableOptions
		}
	}

	return useMemo(() => observable.array<T>(initialValues, { deep: false, ...options }) as ObservableArray<T>, deps)
}
