import { getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { WeightedNFT, Gauge } from "../examples/with-contract-flow/abi";
import { publicClient, walletClient } from "../helper/client";
// 1. tokenId your want to set weight
const tokenId = 1;
// 2. weight you want to set
const weight = 10;

async function main() {
  if (!process.env.GAUGE_ADDRESS || !process.env.GAUGE_OWNER_PRIVATE_KEY || !process.env.CHAIN_ID) {
    throw new Error("GAUGE_ADDRESS and GAUGE_OWNER_PRIVATE_KEY and CHAIN_ID must be set");
  }

  // 1. first get gauge contract
  const gaugeContract = getContract({
    abi: Gauge,
    address: process.env.GAUGE_ADDRESS as `0x${string}`,
    client: {
      public: publicClient(process.env.CHAIN_ID as unknown as number),
      wallet: walletClient(process.env.CHAIN_ID as unknown as number),
    }
  });

  // 2. get weightNFT address from gauge contract
  const weightNFTAddress = await gaugeContract.read.weightNFT() as `0x${string}`;
  console.log('WeightedNFT address:', weightNFTAddress);

  // 3. create weightNFT contract instance
  const contract = getContract({
    abi: WeightedNFT,
    address: weightNFTAddress,
    client: {
      public: publicClient(process.env.CHAIN_ID as unknown as number),
      wallet: walletClient(process.env.CHAIN_ID as unknown as number),
    }
  });

  // 4. get current weight
  const currentWeight = await contract.read.weight([BigInt(tokenId)]);
  console.log(`Current weight for tokenId ${tokenId}:`, currentWeight.toString());

  // use gauge owner private key to set weight
  const account = privateKeyToAccount(process.env.GAUGE_OWNER_PRIVATE_KEY as `0x${string}`);

  // 5. set new weight
  const hash = await contract.write.setWeight(
    [BigInt(tokenId), BigInt(weight)],
    { account }
  );

  const receipt = await publicClient(process.env.CHAIN_ID as unknown as number).waitForTransactionReceipt({ hash });
  console.log('Transaction successful:', receipt.transactionHash);

  // 6. verify new weight
  const newWeight = await contract.read.weight([BigInt(tokenId)]);
  console.log(`New weight for tokenId ${tokenId}:`, newWeight.toString());
}

main().catch(console.error);
