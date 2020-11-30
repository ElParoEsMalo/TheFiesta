import { UserManage } from "./user-manage";
export class User {
  public firstName: string;
  public lastName: string;
  public dni: string;
  public birthdate: string;
  public idUser: string;

  //private userManage: UserManage;
  constructor(
    firstName?: string,
    lastName?: string,
    birthdate?: string,
    dni?: string,
    events?: string[]
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.birthdate = birthdate || "";
    this.dni = dni || "";
  }
  public getFullName(): string {
    return this.firstName + " " + this.lastName;
  }
}
