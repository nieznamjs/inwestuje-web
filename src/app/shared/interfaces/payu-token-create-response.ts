export interface PayuTokenCreateResponse {
  data: {
    token: string;
    mask: string;
    type: 'STANDARD' | 'RECURRING';
  };
  status: {
    statusCode: string;
    codeLiteral: string;
    code: string;
  };
}
