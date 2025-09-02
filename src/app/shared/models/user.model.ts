export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  lastModifiedAt: Date;
  isDeleted?: boolean;
}
