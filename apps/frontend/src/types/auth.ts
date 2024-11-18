export interface Signup {
    username: string;
    email: string;
    password: string;
    repassword: string;
    country_id: string;
  }
  

export interface Signin {
    username: string;
    password: string;
}


export enum AuthStatus {
    Authenticated = "Authenticated",
    Authenticating = "Authenticating",
    Error = "Error",
  }