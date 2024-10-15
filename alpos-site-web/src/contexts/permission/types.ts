export enum UserRole {
  admin = "ADMIN",
  user = "USER",
}

export enum Access {
  none = 0 << 0,
  read = 1 << 0,
  create = 1 << 1,
  update = 1 << 2,
  delete = 1 << 3,
  all = none | read | create | update | Access.delete,
}

export type Scope = string;

export type Ability = {
  role: UserRole;
  access: Access;
  scope: string;
};

export type PermissionContextType = {
  appAbilities: Ability[];
  hasPermission: (access: Access, scope: Scope) => boolean;
};
