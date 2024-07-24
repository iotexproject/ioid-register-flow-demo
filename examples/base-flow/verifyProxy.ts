export class VerifyProxy {
  verifyAddress: string;

  constructor(verifyAddress: string) {
    this.verifyAddress = verifyAddress
  }

  register({
    _verifySignature,
    _hash,
    _uri,
    _owner,
    _device,
    _v,
    _r,
    _s
  }: any) {
    return {
      _verifySignature,
      _hash,
      _uri,
      _owner,
      _device,
      _v,
      _r,
      _s
    }
  }
}