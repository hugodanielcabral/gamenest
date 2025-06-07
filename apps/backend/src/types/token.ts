export interface IToken {
  refresh_id: number;
  token: string;
  expire_date: number | Date;
  user_id: number;
  created_on: Date;
}
