import { useMemo, DependencyList } from 'react'
import { action, flow } from 'mobx'
import { CancellablePromise } from 'mobx/dist/api/flow'

export function useAction<T extends (...args: any[]) => Generator>(
	fn: T,
	deps?: DependencyList,
): (...args: Parameters<T>) => CancellablePromise<T extends (...args: any[]) => Generator<any, infer R> ? R : never>
export function useAction<T extends (...args: any[]) => any>(
	fn: T,
	deps?: DependencyList,
): (...args: Parameters<T>) => ReturnType<T>
export function useAction<T>(
	fn: ((...args: any[]) => T) | ((...args: any[]) => Generator),
	deps = [] as DependencyList,
) {
	return useMemo(() => (isGenerator(fn) ? flow(fn) : action(fn)), deps)
}

const isGenerator = (target: Function): target is () => Generator => {
	return target.constructor.name === 'GeneratorFunction'
}
