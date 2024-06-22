import { useMemo } from 'react'

export type UseTimeagoOptions = {
	style: 'default' | 'twitter'
	hourCycle: 'h11' | 'h12' | 'h23' | 'h24'
}

export const useTimeago = (locale: string, options: UseTimeagoOptions = { style: 'default', hourCycle: 'h23' }) => {
	const { style, hourCycle } = options

	return useMemo(() => {
		if (style === 'twitter') {
			const dmy = new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: '2-digit' })
			const dm = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' })
			const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' })
			const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle })

			return (date: Date) => {
				const seconds = (new Date().getTime() - date.getTime()) / 1000
				const minutes = Math.floor(seconds / 60)
				const hours = Math.floor(minutes / 60)
				const days = Math.floor(hours / 24)
				const months = Math.floor(days / 30)
				const years = Math.floor(months / 12)

				if (years > 0) {
					return dmy.format(date)
				}
				if (months > 0 || days > 7) {
					return dm.format(date)
				}
				if (days > 0) {
					return weekday.format(date)
				}

				return time.format(date).toLocaleLowerCase()
			}
		}

		const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

		return (date: Date) => {
			const seconds = (new Date().getTime() - date.getTime()) / 1000
			const minutes = Math.floor(seconds / 60)
			const hours = Math.floor(minutes / 60)
			const days = Math.floor(hours / 24)
			const months = Math.floor(days / 30)
			const years = Math.floor(months / 12)

			if (years > 0) {
				return rtf.format(0 - years, 'year')
			}
			if (months > 0) {
				return rtf.format(0 - months, 'month')
			}
			if (days > 0) {
				return rtf.format(0 - days, 'day')
			}
			if (hours > 0) {
				return rtf.format(0 - hours, 'hour')
			}
			if (minutes > 0) {
				return rtf.format(0 - minutes, 'minute')
			}

			return 'just now'

			return rtf.format(0 - seconds, 'second')
		}
	}, [locale, style, hourCycle])
}
