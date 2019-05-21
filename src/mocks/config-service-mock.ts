export class ConfigServiceMock {
  public async getMerchantId(): Promise<string> {
    return '123';
  }

  public getApiUrl(): string {
    return 'http://normalurl.pls';
  }
}
