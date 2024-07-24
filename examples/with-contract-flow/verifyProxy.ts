import { createPublicClient, createWalletClient, getContract, http } from "viem";
import { VerifyingProxy } from "./abi";
import { iotexTestnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const publicClient = createPublicClient({
  chain: iotexTestnet,
  transport: http()
})

const walletClient = createWalletClient({
  chain: iotexTestnet,
  transport: http()
})

const account = privateKeyToAccount(process.env.PRIVATE_KEY as any)

export class VerifyProxy {
  verifyAddress: string;

  contract = getContract({
    abi: VerifyingProxy,
    //create by contract UniversalFactory
    address: "0xa09ef1296c71c20ecd08d477cc7d71e9457d1223",
    client: {
      public: publicClient,
      wallet: walletClient,
    }
  })

  constructor(verifyAddress: string) {
    this.verifyAddress = verifyAddress
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