import { Prisma } from "../../api/generated/client";

export type AuthContextType = {
  isAuthorized: boolean;
  user?: Prisma.UserCreateInput;
  setUser?: (user?: Prisma.UserCreateInput) => void;
};
