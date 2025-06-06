export enum Roles {
  Administrador = "administrador",
  Usuario = "usuario",
}

export interface IRoles {
  role_id: number;
  name: Roles;
}