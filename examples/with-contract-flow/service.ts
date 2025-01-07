import axios from "axios";
import { ethers, getBytes, solidityPacked } from "ethers";

export class Service {
  verifier: ethers.Wallet | null = null;

  constructor(verifyPrivateKey: string) {
    this.verifier = new ethers.Wallet(verifyPrivateKey);
  }

  async signMessage(ownerAddress: string, deviceAddress: string) {
    const verifyMessage = solidityPacked(['uint256', 'address', 'address'], [process.env.CHAIN_ID, ownerAddress, deviceAddress]);
    const verifySignature = await this.verifier?.signMessage(getBytes(verifyMessage));
    return verifySignature;
  }
}