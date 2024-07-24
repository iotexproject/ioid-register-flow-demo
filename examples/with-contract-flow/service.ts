import axios from "axios";
import { ethers, getBytes, solidityPacked } from "ethers";

export class Service {
  verifier = new ethers.Wallet(process.env.PRIVATE_KEY as string);

  async verify(ownerAddress: string, deviceAddress: string) {
    const verifyer = await axios.get(`https://ioid-backend.onrender.com/pebble/verifier?owner=${ownerAddress}&device=${deviceAddress}`)
    return verifyer.data.verifySignature;
  }
}