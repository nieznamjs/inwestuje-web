import { NIP_REQUIREMENT_REGEX_STRING, PASSWORD_REQUIREMENT_REGEX_STRING } from '@constants/regexes';

const PASSWORD_REQUIREMENT_REGEX = RegExp(PASSWORD_REQUIREMENT_REGEX_STRING);
const NIP_REQUIREMENT_REGEX = RegExp(NIP_REQUIREMENT_REGEX_STRING);

describe('Regexes', () => {
  describe('Password requirement regex', () => {
    const VALID_PASSWORD = '123asD';
    const TOO_SHORT_PASSWORD = '123Ds';
    const TOO_LONG_PASSWORD = '987654321asdfghPOIoiejsuajs';
    const INSUFFICIENTLY_COMPLICATED_PASSWORD = '123asdpo';

    it('valid password should pass', () => {
      expect(PASSWORD_REQUIREMENT_REGEX.test(VALID_PASSWORD)).toBeTruthy();
    });

    it('too short password should not pass', () => {
      expect(PASSWORD_REQUIREMENT_REGEX.test(TOO_SHORT_PASSWORD)).toBeFalsy();
    });

    it('too long password should not pass', () => {
      expect(PASSWORD_REQUIREMENT_REGEX.test(TOO_LONG_PASSWORD)).toBeFalsy();
    });

    it('insufficiently complicated password should not pass', () => {
      expect(PASSWORD_REQUIREMENT_REGEX.test(INSUFFICIENTLY_COMPLICATED_PASSWORD)).toBeFalsy();
    });
  });

  describe('NIP requirement regex', () => {
    const VALID_NIP = '1239876451';
    const TOO_SHORT_NIP = '123';
    const TOO_LONG_NIP = '98712365492';

    it('valid NIP should pass', () => {
      expect(NIP_REQUIREMENT_REGEX.test(VALID_NIP)).toBeTruthy();
    });

    it('too short NIP should not pass', () => {
      expect(NIP_REQUIREMENT_REGEX.test(TOO_SHORT_NIP)).toBeFalsy();
    });

    it('too long NIP should not pass', () => {
      expect(NIP_REQUIREMENT_REGEX.test(TOO_LONG_NIP)).toBeFalsy();
    });
  });
});
