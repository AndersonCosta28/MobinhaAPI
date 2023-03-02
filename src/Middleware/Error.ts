import { CustomErrorAPI } from "Types/CustomErrors"
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MiddlewareError = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
	const { statusCode, message } = CustomErrorAPI.throwError(error)	
	console.debug(error)
	res.status(statusCode).json({ message })
}