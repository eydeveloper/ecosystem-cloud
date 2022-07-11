export interface IAuthError {
  data: {
    message: string;
    errors: []
  },
  status: number;
}
