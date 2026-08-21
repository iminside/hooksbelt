import { useMemo, DependencyList } from 'react'
import { observable, ObservableMap, CreateObservableOptions, IObservableMapInitialValues } from 'mobx'

type ReadonlyMapEntries<K, V> = readonly (readonly [K, V])[]

function isMapEntries<K, V>(
	initialValues: IObservableMapInitialValues<K, V>,
): initialValues is ReadonlyMapEntries<K, V> {
	return Array.isArray(initialValues)
}

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

	return useMemo(() => {
		const observableOptions = { deep: false, ...options }

		if (initialValues instanceof Map) {
			return observable.map(initialValues, observableOptions)
		}

		if (isMapEntries(initialValues)) {
			return observable.map(initialValues, observableOptions)
		}

		return observable.map(initialValues, observableOptions)
	}, deps)
}
