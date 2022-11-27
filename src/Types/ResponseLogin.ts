import StatusCode from "status-code-enum";

export default interface ResponseLogin {
  Code: StatusCode;
  Message?: string;
  IdUser?: number;
  IdPlayer?: number;
  Nickname?: string;
  Authenticated: boolean;
  EXP?: number;
  Level?: number;
}
