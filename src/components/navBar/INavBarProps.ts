import { UserOperationCallback } from "../../models";

export interface INavBarProps {
  isAuthenticated: boolean;
  onLogout: UserOperationCallback;
  tipo: string;
}