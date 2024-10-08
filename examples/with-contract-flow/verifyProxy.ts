import { createPublicClient, createWalletClient, getContract, http } from "viem";
import { VerifyingProxy } from "./abi";
import { privateKeyToAccount } from "viem/accounts";
import { publicClient, walletClient } from ".";

const account = privateKeyToAccount(process.env.VERIFY_PRIVATE_KEY as any)

export class VerifyProxy {
  //@ts-ignore
  contract;

  constructor(verifyProxyAddress: string) {
    this.contract = getContract({
      abi: VerifyingProxy,
      address: verifyProxyAddress as `0x${string}`,
      client: {
        public: publicClient,
        wallet: walletClient,
      }
    })
  }

  async register({
    _verifySignature,
    _hash,
    _uri,
    _owner,
    _device,
    _v,
    _r,
    _s
  }: any) {
    console.log(
      "Register params:", {
      _verifySignature,
      _hash,
      _uri,
      _owner,
      _device,
      _v,
      _r,
      _s
    })
    return await publicClient.waitForTransactionReceipt({
      hash: await this.contract.write.register([
        _verifySignature,
        _hash,
        _uri,
        _owner,
        _device,
        _v,
        _r,
        _s
      ], { account })
    })
  }
}