import { ethers } from "ethers";

export class Device {
  name = "WatchX"
  device = ethers.Wallet.createRandom()
  get address(){
    return this.device.address
  }

  get did() {
    return 'did:io:0xB14d3c4F5FBFBCFB98af2d330000d49c95B93aA7'
  }

  get diddoc() {
    //todo: generate diddoc from sdk
    return {
      "@context": ["https://www.w3.org/ns/did/v1", "https://w3id.org/security#keyAgreementMethod"],
      "id": "did:io:0x6c5ea73f0824f366665a6618dc140f37652daf96",
      "authentication": ["did:io:0x6c5ea73f0824f366665a6618dc140f37652daf96#Key-p256-2147483618"],
      "keyAgreement": ["did:io:0xcbe493edde55bedb53a274524758bf46782604ab#Key-p256-2147483619"],
      "verificationMethod": [{
        "id": "did:io:0x6c5ea73f0824f366665a6618dc140f37652daf96#Key-p256-2147483618",
        "type": "JsonWebKey2020",
        "controller": "did:io:0x6c5ea73f0824f366665a6618dc140f37652daf96",
        "publicKeyJwk": {
          "crv": "P-256",
          "x": "LkIWOM-NEeeN0gIU0akYcVs5zIK8yIqWnLvrs2ALNd0",
          "y": "-eQUT37pvLIeFx5cr5YJMyp3w4rYaD-hhVjtzsKnbDQ",
          "kty": "EC",
          "kid": "Key-p256-2147483618"
        }
      }, {
        "id": "did:io:0xcbe493edde55bedb53a274524758bf46782604ab#Key-p256-2147483619",
        "type": "JsonWebKey2020",
        "controller": "did:io:0x6c5ea73f0824f366665a6618dc140f37652daf96",
        "publicKeyJwk": {
          "crv": "P-256",
          "x": "AToMUwNqP6PYk_PDp9tDHr3blWpxBxyHsTcFNcMoPNE",
          "y": "E-s-PM7K_OTj8CDi7Lm3Z-eqIt6Ymr96atoRw-BlgO4",
          "kty": "EC",
          "kid": "Key-p256-2147483619"
        }
      }]
    }
  }

  async sign() {
    const domain = {
      name: 'ioIDRegistry',
      version: '1',
      chainId: 4690,
      verifyingContract: "0x0A7e595C7889dF3652A19aF52C18377bF17e027D",
    };
    const types = {
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'nonce', type: 'uint256' },
      ],
    };

    const signature = await this.device.signTypedData(domain, types, { owner: "0xa09ef1296c71c20ecd08d477cc7d71e9457d1223", nonce: 0 });
    const r = signature.substring(0, 66);
    const s = '0x' + signature.substring(66, 130);
    const v = '0x' + signature.substring(130);
    return { r, s, v }
  }
}