export interface OpenPayU {
  Token: {
    create: Function;
    getValueByMap: Function;
    normalize: Function;
    setValueByMap: Function;
    setup: Function;
    validate: Function;
  };
  merchantId?: string;
}
