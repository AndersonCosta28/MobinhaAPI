import { StatusCode } from "status-code-enum"

export default interface IResponse {
  code: StatusCode
  message: string
}

export interface IResponseLogin extends IResponse {
  idUser?: number
  idProfile?: number
  nickname?: string
  token: string
  exp?: number
  level?: number,
}
