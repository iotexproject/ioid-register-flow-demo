export class VerifyProxy {
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