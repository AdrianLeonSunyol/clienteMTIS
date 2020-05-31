import { IUser } from "../../models";

export interface IService {
  get();
  getOne(id: string)
  post(object: any);
  delete(id: string);
  deleteAll();
}