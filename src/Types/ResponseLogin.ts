import StatusCode from "status-code-enum";

export default interface ResponseLogin {
  statusCode: StatusCode;
  message?: string;
  id?: number;
  authenticated: boolean;
}
