export type TUser = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  following: string[];
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
