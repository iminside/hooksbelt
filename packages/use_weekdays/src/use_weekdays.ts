import { useMemo } from 'react'
import { useIntl } from '@hooksbelt/use-intl'

export interface UseWeekdaysOptions {
	startFrom?: number
	type?: 'long' | 'short' | 'narrow'
}

export const useWeekdays = (locale: string, options = {} as UseWeekdaysOptions) => {
	const { startFrom = 0, type = 'long' } = options
	const intl = useIntl(locale, {
		weekday: { type: 'DateTime', weekday: type },
	})

	return useMemo(() => {
		const acc = Array.from({ length: 7 }, (_, key) => {
			const name = intl.weekday(Date.UTC(2001, 0, key, 12))

			return { key, name }
		})

		return [...acc.slice(startFrom), ...acc.slice(0, startFrom)]
	}, [intl, startFrom])
}
