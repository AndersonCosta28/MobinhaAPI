export const addHours = (date: Date, hours: number) => {
	const copiedDate = new Date(date.getTime())
	copiedDate.setHours(copiedDate.getHours() + hours)
	return copiedDate
}

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : error as string