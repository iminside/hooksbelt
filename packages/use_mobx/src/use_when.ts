import { useEffect, DependencyList } from 'react'
import { when, IWhenOptions } from 'mobx'

export function useWhen(predicate: () => boolean, effect: () => void, options: IWhenOptions, deps: DependencyList): void
export function useWhen(predicate: () => boolean, effect: () => void, options: IWhenOptions): void
export function useWhen(predicate: () => boolean, effect: () => void, deps: DependencyList): void
export function useWhen(predicate: () => boolean, effect: () => void): void
export function useWhen(predicate: () => boolean, effect: () => void, ...args: unknown[]) {
	let options = {} as IWhenOptions
	let deps = [] as DependencyList

	for (const arg of args) {
		if (Array.isArray(arg)) {
			deps = arg as DependencyList
		} else {
			options = arg as IWhenOptions
		}
	}

	useEffect(() => when(predicate, effect, options), deps)
}
