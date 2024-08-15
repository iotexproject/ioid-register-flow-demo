import { ethers, keccak256 } from "ethers";
import { Device } from "./device";
import { Service } from "./service";
import { VerifyProxy } from "./verifyProxy";
import { createPublicClient, createWalletClient, http } from "viem";
import { iotexTestnet } from "viem/chains";
import axios from "axios";

export const VERIFY_PROXY_ADDRESS = process.env.VERIFY_PROXY_ADDRESS as any

export const publicClient = createPublicClient({
  chain: iotexTestnet,
  transport: http()
})
export const walletClient = createWalletClient({
  chain: iotexTestnet,
  transport: http()
})

const MyDevice = new Device();

const MyVerifyService = new Service()

//create by contract UniversalFactory,need verfiyadress is equal to process.env.VERIFY_PRIVATE_KEY
const MyVerifyProxy = new VerifyProxy(VERIFY_PROXY_ADDRESS)

const Owner = ethers.Wallet.createRandom()

async function main() {
  // 0.find device
  const did = MyDevice.did

  if (!did) throw new Error("did not found")

  // 1.device need sign message
  const { r, s, v } = await MyDevice.sign()
  console.log('1.device sign message success:', { r, s, v }, '\n\n')

  // 2.verify owner and device by verify service
  const verifySignature = await MyVerifyService.signMessage("0x610CBDa6f0037B4141A5B949f56479106BeCb1E9", MyDevice.address)
  console.log('2.verifyer sign message success:', verifySignature, '\n\n')

  // 3.todo upload diddoc to ipfs
  const ipfsRes = await axios.post(`https://did.iotex.me/upload`, { data: MyDevice.diddoc, type: 'ipfs' });
  const { cid } = ipfsRes.data;
  console.log('3.diddoc upload success:', cid, '\n\n')

  // 4.all signature params is ready,call verifyProxy register function.
  const res = await MyVerifyProxy.register({
    _verifySignature: verifySignature,
    _hash: keccak256(did.replace('did:io:', '')), //did hash
    _uri: cid, //diddoc
    // _owner: Owner.address,
    _owner: "0x610CBDa6f0037B4141A5B949f56479106BeCb1E9",
    _device: MyDevice.address,
    _v: v,
    _r: r,
    _s: s
  })
  console.log('4.register success:', res)
  console.log('5.go to the iotexscan:->', `https://testnet.iotexscan.io/tx/${res.transactionHash}`)
}

main()