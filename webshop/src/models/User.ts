export class User {
  constructor(
    public providerId: string,
    public displayName: string,
    public photoUrl: string,
    public federatedId: string,
    public email: string,
    public rawId: string
  ) {}
}