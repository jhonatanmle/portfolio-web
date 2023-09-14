export class AuthError extends Error {
  message = '';

  constructor(message: string) {
    super();
    this.message = message;
  }
}
