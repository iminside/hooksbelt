import { useEffect, DependencyList } from 'react'
import { autorun, IAutorunOptions } from 'mobx'

export function useAutorun(fn: () => void, options: IAutorunOptions, deps: DependencyList): void
export function useAutorun(fn: () => void, options: IAutorunOptions): void
export function useAutorun(fn: () => void, deps: DependencyList): void
export function useAutorun(fn: () => void): void
export function useAutorun(fn: () => void, ...args: unknown[]) {
	let options = {} as IAutorunOptions
	let deps = [] as DependencyList

	for (const arg of args) {
		if (Array.isArray(arg)) {
			deps = arg as DependencyList
		} else {
			options = arg as IAutorunOptions
		}
	}

	useEffect(() => autorun(fn, options), deps)
}
