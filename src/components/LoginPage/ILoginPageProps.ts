import { UserOperationCallback } from "../../models";

export interface ILoginPageProps {
  isAuthenticated;
  loginUser: UserOperationCallback;
}