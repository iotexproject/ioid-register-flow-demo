import { Hono } from 'hono'
import { VerifyProxy } from './examples/with-contract-flow/verifyProxy'
import { ethers, keccak256 } from 'ethers'
import { Device } from './examples/with-contract-flow/device'
import { Service } from './examples/with-contract-flow/service'



const app = new Hono()

app.get("/", (c) => {
  return c.text("hello world")
})
// Main registration endpoint
app.post('/register', async (c) => {
  try {
    // Get parameters from request body
    const {
      ownerAddress,
      verifyPrivateKey,
      verifyProxyAddress,
      chainId
    } = await c.req.json()

    // Validate required parameters
    if (!ownerAddress || !verifyPrivateKey || !verifyProxyAddress || !chainId) {
      return c.json({
        error: 'Missing required parameters. Need: ownerAddress, verifyPrivateKey, verifyProxyAddress, chainId'
      }, 400)
    }

    // Initialize components with provided parameters
    const MyDevice = new Device({
      chainId: Number(chainId),
      verifyProxyAddress: verifyProxyAddress as `0x${string}`
    })
    const MyVerifyService = new Service('0x' + verifyPrivateKey.replace('0x', ''))
    const MyVerifyProxy = new VerifyProxy({
      address: verifyProxyAddress,
      chainId: Number(chainId),
      privateKey: '0x' + verifyPrivateKey.replace('0x', '') as `0x${string}`
    })

    // Rest of the registration logic remains the same
    const did = MyDevice.did
    if (!did) {
      return c.json({ error: 'DID not found' }, 404)
    }

    const { r, s, v } = await MyDevice.sign()
    const verifySignature = await MyVerifyService.signMessage(ownerAddress, MyDevice.address)
    const diduri = 'http://resolver.did'

    const result = await MyVerifyProxy.register({
      _verifySignature: verifySignature,
      _hash: keccak256(MyDevice.address),
      _uri: diduri,
      _owner: ownerAddress,
      _device: MyDevice.address,
      _v: v,
      _r: r,
      _s: s
    })

    return c.json({
      success: true,
      transactionHash: result.transactionHash,
      deviceAddress: MyDevice.address,
      did: did
    })

  } catch (error) {
    console.error('Registration error:', error)
    return c.json({
      error: 'Registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

app.get('/health', (c) => {
  return c.json({
    status: 'ok'
  })
})

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
}
