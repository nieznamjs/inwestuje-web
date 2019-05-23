export class ConfigServiceMock {
  public async getMerchantId(): Promise<string> {
    return '123';
  }

  get ApiUrl(): string {
    return 'http://normalurl.pls';
  }
}
