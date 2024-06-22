import { DependencyList, useMemo } from 'react'

interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions {
	type: 'DateTime'
}

interface NumberFormatOptions extends Intl.NumberFormatOptions {
	type: 'Number'
}

interface Params {
	[k: string]: DateTimeFormatOptions | NumberFormatOptions
}

type Result<P extends Params> = {
	[K in keyof P]: P[K]['type'] extends 'DateTime'
		? Intl.DateTimeFormat['format']
		: P[K]['type'] extends 'Number'
		? Intl.NumberFormat['format']
		: never
}

export const useIntl = <P extends Params>(locales: string | string[], optionsMap: P, deps = [] as DependencyList) => {
	return useMemo(() => {
		const result = {} as { [k: string]: (...args: any[]) => any }

		for (const [key, params] of Object.entries(optionsMap)) {
			if (params.type === 'DateTime') {
				result[key] = new Intl.DateTimeFormat(locales, params).format
			}
			if (params.type === 'Number') {
				result[key] = new Intl.NumberFormat(locales, params).format
			}
		}

		return result as Result<P>
	}, deps.concat(locales))
}
