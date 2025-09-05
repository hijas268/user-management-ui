export interface User {
  id: string;
  username: string;
  password:string;
  email: string;
  roleId: number;
  createdAt: Date;
  lastModifiedAt: Date;
  isDeleted?: boolean;
}
export interface CreateuserModel{
  Username:string;
  Email : string;
 Password : string;
 RoleId : number;
}