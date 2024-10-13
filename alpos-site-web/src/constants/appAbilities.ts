import { Ability, Access, UserRole } from "@/components/permission";

export const appAbilities: Ability[] = [
  { role: UserRole.admin, scope: "post", access: Access.all },
  { role: UserRole.user, scope: "post", access: Access.read },
  { role: UserRole.admin, scope: "project", access: Access.all },
  { role: UserRole.user, scope: "project", access: Access.read },
];
