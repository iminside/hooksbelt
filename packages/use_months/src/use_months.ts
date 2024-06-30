import { useMemo } from 'react'
import { useIntl } from '@hooksbelt/use-intl'

export interface UseMonthsOptions {
	startFrom?: number
	type?: 'numeric' | '2-digit' | 'short' | 'long' | 'narrow'
}

export const useMonths = (locale: string, options = {} as UseMonthsOptions) => {
	const { startFrom = 0, type = 'long' } = options
	const intl = useIntl(locale, {
		month: { type: 'DateTime', month: type },
	})

	return useMemo(() => {
		const acc = Array.from({ length: 12 }, (_, key) => {
			const name = intl.month(new Date(Date.UTC(2024, key)))

			return { key, name }
		})

		return [...acc.slice(startFrom), ...acc.slice(0, startFrom)]
	}, [intl, startFrom])
}
