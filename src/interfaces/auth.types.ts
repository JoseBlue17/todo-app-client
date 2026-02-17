export interface IUser {
  id: string;
  email: string;
  name?: string;
}

export interface IOnLogin {
  token: string;
  user: IUser;
}
