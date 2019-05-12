export enum PayuCreateTokenResponses {
  Success = '0',
  GeneralError = '100',
  UnknownMerchant = '101',
  CardInvalidCvv = '4003',
  CardTokenizationDisabled = '4100',
  CardMerchantInactive = '4101',
}
