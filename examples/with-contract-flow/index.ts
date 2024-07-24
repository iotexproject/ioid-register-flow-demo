import { ethers, keccak256 } from "ethers";
import { Device } from "./device";
import { Service } from "./service";
import { VerifyProxy } from "./verifyProxy";

const MyDevice = new Device();

const MyVerifyService = new Service()

const MyVerifyProxy = new VerifyProxy(MyVerifyService.verifier.address)

const Owner = ethers.Wallet.createRandom()

async function main() {
  // 0.find device
  const did = MyDevice.did

  if (!did) throw new Error("did not found")

  // 1.device need sign message
  const { r, s, v } = await MyDevice.sign()
  console.log('1.device sign message success:', { r, s, v }, '\n\n')

  // 2.verify owner and device by verify service
  const verifySignature = await MyVerifyService.verify(Owner.address, MyDevice.address)
  console.log('2.verifyer sign message success:', verifySignature, '\n\n')

  // 3.todo upload diddoc to ipfs
  // const doc = MyDevice.diddoc
  // const ipfsRes = await axios.post(`${ipfsServiceUrl}/upload`, { data: MyDevice.diddoc, type: 'ipfs' });
  // const { cid } = ipfsRes.data;
  const diduri = 'http://resolver.did'
  console.log('3.diddoc upload success:', 'http://resolver.did', '\n\n')

  // 4.all signature params is ready,call verifyProxy register function.
  const res = await MyVerifyProxy.register({
    _verifySignature: verifySignature,
    _hash: keccak256(did.replace('did:io:', '')), //did hash
    _uri: diduri, //diddoc
    _owner: Owner.address,
    _device: MyDevice.address,
    _v: v,
    _r: r,
    _s: s
  })
  console.log('4.register success:', res)
}

main()