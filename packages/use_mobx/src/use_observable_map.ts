import { useMemo, DependencyList } from 'react'
import { observable, ObservableMap, CreateObservableOptions, IObservableMapInitialValues } from 'mobx'

export function useObservableMap<K, V>(
	initialValues: IObservableMapInitialValues<K, V>,
	options: CreateObservableOptions,
	deps: DependencyList,
): ObservableMap<K, V>
export function useObservableMap<K, V>(
	initialValues: IObservableMapInitialValues<K, V>,
	options: CreateObservableOptions,
): ObservableMap<K, V>
export function useObservableMap<K, V>(
	initialValues: IObservableMapInitialValues<K, V>,
	deps: DependencyList,
): ObservableMap<K, V>
export function useObservableMap<K, V>(initialValues: IObservableMapInitialValues<K, V>): ObservableMap<K, V>
export function useObservableMap<K, V>(initialValues: IObservableMapInitialValues<K, V>, ...args: unknown[]) {
	let options = {} as CreateObservableOptions
	let deps = [] as DependencyList

	for (const arg of args) {
		if (Array.isArray(arg)) {
			deps = arg as DependencyList
		} else {
			options = arg as CreateObservableOptions
		}
	}

	return useMemo(() => observable.map<K, V>(initialValues, { deep: false, ...options }) as ObservableMap<K, V>, deps)
}
