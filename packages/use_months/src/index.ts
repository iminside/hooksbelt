import { useMemo } from 'react'
import { useIntl } from '@hooksbelt/use-intl'

export const useMonths = (locale: string, startFrom = 0) => {
	const intl = useIntl(locale, {
		month: { type: 'DateTime', month: 'long' },
	})

	return useMemo(() => {
		const acc = Array.from({ length: 12 }, (_, i) => {
			const key = i + 1
			const name = intl.month(new Date(Date.UTC(2024, i)))

			return { key, name }
		})

		return [...acc.slice(startFrom), ...acc.slice(0, startFrom)]
	}, [intl, startFrom])
}
