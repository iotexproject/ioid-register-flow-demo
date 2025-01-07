import { createPublicClient, createWalletClient, http } from "viem"
import { iotex, iotexTestnet } from "viem/chains"

export const publicClient = (chainId: number) => createPublicClient({
  chain: chainId == 4689 ? iotex : iotexTestnet,
  transport: http()
})

export const walletClient = (chainId: number) => createWalletClient({
  chain: chainId == 4689 ? iotex : iotexTestnet,
  transport: http()
})