import { useMemo } from 'react'
import { useIntl } from '@hooksbelt/use-intl'

export interface UseWeekdaysOptions {
	startFrom?: number
	startKey?: number
	rotate?: number
	type?: 'long' | 'short' | 'narrow'
}

export const useWeekdays = (locale: string, options = {} as UseWeekdaysOptions) => {
	const { startFrom = 0, startKey = 0, rotate = 0, type = 'long' } = options
	const intl = useIntl(locale, {
		weekday: { type: 'DateTime', weekday: type },
	})

	return useMemo(() => {
		const acc = Array.from({ length: 7 }, (_, i) => {
			const key = startKey + i
			const name = intl.weekday(Date.UTC(2001, 0, startFrom + i, 12))

			return { key, name }
		})

		return [...acc.slice(rotate), ...acc.slice(0, rotate)]
	}, [intl, startFrom, startKey, rotate])
}
