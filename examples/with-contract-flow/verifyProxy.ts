import { privateKeyToAccount } from "viem/accounts";
import { VerifyingProxy } from "./abi";
import { publicClient, walletClient } from "../../helper/client";
import { getContract } from "viem";

export class VerifyProxy {
  //@ts-ignore
  contract: any;
  account = privateKeyToAccount(process.env.VERIFY_PRIVATE_KEY as any);
  publicClient: any;
  walletClient: any;

  constructor({ address, chainId, privateKey }: { address: `0x${string}`, chainId: number, privateKey: `0x${string}` }) {
    this.publicClient = publicClient(chainId ?? process.env.CHAIN_ID ?? 4689);
    this.walletClient = walletClient(chainId ?? process.env.CHAIN_ID ?? 4689);
    this.contract = getContract({
      abi: VerifyingProxy,
      address: address as `0x${string}`,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })

    if (privateKey) {
      this.account = privateKeyToAccount(privateKey);
    }
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


    return await this.publicClient.waitForTransactionReceipt({
      hash: await this.contract.write.register([
        _verifySignature,
        _hash,
        _uri,
        _owner,
        _device,
        _v,
        _r,
        _s
      ], { account: this.account })
    })
  }
}