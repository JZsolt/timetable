export class User {
  constructor(
    private jwt: string,
    public user: {
      id: number;
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: string;
      updatedAt: string;
    }
  ) {}

  get token() {
    return this.jwt;
  }
}
