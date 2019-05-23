import { ConfigService } from '@services/utils/config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
  });

  it('getMerchantId should return string with merchant ID', async () => {
    expect(typeof await configService.getMerchantId()).toBe('string');
  });

  it('getApiUrl should return proper API url', () => {
    expect(configService.apiUrl).toBe('https://inwestuje-dev.deftcode.pl/api');
  });
});
