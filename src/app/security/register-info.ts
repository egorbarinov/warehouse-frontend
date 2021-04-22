export class RegisterInfo {
  name: string;
  username: string;
  email: string;
  roles: string[];
  password: string;

  constructor(name: string, username: string, email: string, roles: string[], password: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.password = password;
  }
}
