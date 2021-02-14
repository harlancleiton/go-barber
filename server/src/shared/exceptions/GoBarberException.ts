export class GoBarberException {
  constructor(
    public readonly message: string,
    public readonly statusCode = 500
  ) {}
}
