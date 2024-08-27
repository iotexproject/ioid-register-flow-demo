import { ethers } from "ethers";
import { VERIFY_PROXY_ADDRESS } from ".";
// import DIDKit from '@spruceid/didkit';

export class Device {
  name = "DepinDevice"
  device = ethers.Wallet.createRandom()
  get address() {
    return this.device.address
  }

  get did() {
    return `did:io:${this.address}`
  }

  get diddoc() {
    return {}
    // generate diddoc
    // const key = DIDKit.generateEd25519Key();
    // const did = DIDKit.keyToDID('key', key);
    // const verificationMethod = DIDKit.keyToVerificationMethod('key', key);
    // const vc = DIDKit.issueCredential({
    //   "@context": "https://www.w3.org/2018/credentials/v1",
    //   "id": "http://example.org/credentials/3731",
    //   "type": ["VerifiableCredential"],
    //   "issuer": did,
    //   "issuanceDate": "2020-08-19T21:41:50Z",
    //   "credentialSubject": {
    //     "id": "did:example:d23dd687a7dc6787646f2eb98d0"
    //   }
    // }, {
    //   "proofPurpose": "assertionMethod",
    //   "verificationMethod": verificationMethod
    // }, key);
    // return vc
  }

  async sign() {
    const domain = {
      name: 'ioIDRegistry',
      version: '1',
      chainId: 4689,
      verifyingContract: process.env.IOID_REGISTER_ADDRESS ?? "0x04e4655Cf258EC802D17c23ec6112Ef7d97Fa2aF", //ioIDRegistry address
    };
    const types = {
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'nonce', type: 'uint256' },
      ],
    };

    const signature = await this.device.signTypedData(domain, types, { owner: VERIFY_PROXY_ADDRESS, nonce: 0 });
    const r = signature.substring(0, 66);
    const s = '0x' + signature.substring(66, 130);
    const v = '0x' + signature.substring(130);
    return { r, s, v }
  }
}