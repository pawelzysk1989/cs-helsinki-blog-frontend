export interface User {
  id: string;
  username: string;
  name?: string;
  token: string;
}

export interface Credentials {
  username: string;
  password: string;
}
