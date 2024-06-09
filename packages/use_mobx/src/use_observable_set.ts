import { useMemo, DependencyList } from 'react'
import { observable, ObservableSet, CreateObservableOptions, IObservableSetInitialValues } from 'mobx'

export function useObservableSet<T>(
	initialValues: IObservableSetInitialValues<T>,
	options: CreateObservableOptions,
	deps: DependencyList,
): ObservableSet<T>
export function useObservableSet<T>(
	initialValues: IObservableSetInitialValues<T>,
	options: CreateObservableOptions,
): ObservableSet<T>
export function useObservableSet<T>(
	initialValues: IObservableSetInitialValues<T>,
	deps: DependencyList,
): ObservableSet<T>
export function useObservableSet<T>(initialValues: IObservableSetInitialValues<T>): ObservableSet<T>
export function useObservableSet<T>(initialValues: IObservableSetInitialValues<T>, ...args: unknown[]) {
	let options = {} as CreateObservableOptions
	let deps = [] as DependencyList

	for (const arg of args) {
		if (Array.isArray(arg)) {
			deps = arg as DependencyList
		} else {
			options = arg as CreateObservableOptions
		}
	}

	return useMemo(() => observable.set<T>(initialValues, { deep: false, ...options }) as ObservableSet<T>, deps)
}
