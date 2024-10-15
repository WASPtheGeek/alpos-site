import { Ability, Access, UserRole } from "@/contexts/permission";

export enum AppScope {
  adminC = "admin_control",
  post = "post",
  cat = "category",
  prod = "product",
}

export const appAbilities: Ability[] = [
  {
    role: UserRole.admin,
    scope: AppScope.adminC as string,
    access: Access.all,
  },
  {
    role: UserRole.user,
    scope: AppScope.adminC as string,
    access: Access.none,
  },
  { role: UserRole.admin, scope: AppScope.post as string, access: Access.all },
  { role: UserRole.user, scope: AppScope.post as string, access: Access.read },
  { role: UserRole.admin, scope: AppScope.cat as string, access: Access.all },
  { role: UserRole.user, scope: AppScope.cat as string, access: Access.none },
  { role: UserRole.admin, scope: AppScope.prod as string, access: Access.all },
  { role: UserRole.user, scope: AppScope.prod as string, access: Access.read },
];
