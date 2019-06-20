export class ConfigServiceMock {
  public async getMerchantId(): Promise<string> {
    return '123';
  }

  get apiUrl(): string {
    return 'http://normalurl.pls';
  }
}
