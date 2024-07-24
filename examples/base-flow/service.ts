import { ethers, getBytes, solidityPacked } from "ethers";

export class Service {
  verifier = new ethers.Wallet(process.env.VERIFY_PRIVATE_KEY as string);

  async verify(ownerAddress: string, deviceAddress: string) {
    const verifyMessage = solidityPacked(['uint256', 'address', 'address'], [4690, ownerAddress, deviceAddress]);
    const verifySignature = await this.verifier.signMessage(getBytes(verifyMessage));
    return verifySignature;
  }
}