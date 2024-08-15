import { ethers } from "ethers";
import { VERIFY_PROXY_ADDRESS } from ".";
import DIDKit from '@spruceid/didkit';

export class Device {
  name = "WatchX"
  device = ethers.Wallet.createRandom()
  get address() {
    return this.device.address
  }

  get did() {
    return `did:io:${this.address}`
  }

  get diddoc() {
    //todo: generate diddoc from sdk
    const key = DIDKit.generateEd25519Key();
    // There are two helpful functions to obtain a DID and the `did:key`
    // `verificationMethod` from the key.
    const did = DIDKit.keyToDID('key', key);
    const verificationMethod = DIDKit.keyToVerificationMethod('key', key);
    const vc = DIDKit.issueCredential({
      "@context": "https://www.w3.org/2018/credentials/v1",
      "id": "http://example.org/credentials/3731",
      "type": ["VerifiableCredential"],
      "issuer": did,
      "issuanceDate": "2020-08-19T21:41:50Z",
      "credentialSubject": {
        "id": "did:example:d23dd687a7dc6787646f2eb98d0"
      }
    }, {
      "proofPurpose": "assertionMethod",
      "verificationMethod": verificationMethod
    }, key);
    return vc
  }

  async sign() {
    const domain = {
      name: 'ioIDRegistry',
      version: '1',
      chainId: 4690,
      verifyingContract: "0x0A7e595C7889dF3652A19aF52C18377bF17e027D", //ioIDRegistry address
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