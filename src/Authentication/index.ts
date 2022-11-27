import { userService } from "../User";
import AuthenticationController from "./authentication.controller";
import AuthenticationService from "./authentication.service";

const authenticationService: AuthenticationService = new AuthenticationService(userService);
const authenticationController: AuthenticationController = new AuthenticationController(authenticationService);

export { authenticationService, authenticationController };
