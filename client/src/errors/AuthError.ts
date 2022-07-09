export interface AuthError {
  data: {
    message: string;
    errors: []
  },
  status: number;
}
