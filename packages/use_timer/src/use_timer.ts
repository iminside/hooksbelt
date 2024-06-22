import { useEffect, useState } from 'react'

export interface UseTimerOptions {
	interval?: number
}

export const useTimer = (expires: number | Date, options: UseTimerOptions = {}) => {
	if (expires instanceof Date) {
		expires = expires.getTime()
	}

	const { interval = 1000 } = options
	const [, update] = useState(true)
	const result = Math.max(0, Math.round((expires - Date.now()) / interval))

	useEffect(() => {
		if (result === 0) {
			return
		}

		const timeoutId = setTimeout(() => update((s) => !s), interval)

		return () => clearTimeout(timeoutId)
	}, [result, expires, interval])

	return result
}
