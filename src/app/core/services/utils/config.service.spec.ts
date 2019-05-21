import { ConfigService } from '@services/utils/config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
  });

  it('getMerchantId should return string with merchant ID', () => {
    configService.getMerchantId().then((merchantId: string) => {
      expect(typeof merchantId).toEqual('string');
    });
  });

  it('getApiUrl should return proper API url', () => {
    expect(configService.getApiUrl()).toEqual('https://inwestuje-dev.deftcode.pl/api');
  });
});
