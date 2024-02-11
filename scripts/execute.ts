import { ethers } from "hardhat";
import { EntryPoint } from "../typechain-types/core";

const FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ENTRY_POINT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const [ owner, signer1 ] = await ethers.getSigners();
  const entryPoint = await ethers.getContractAt("EntryPoint", ENTRY_POINT_ADDRESS) as EntryPoint;

  // Address of the smart account
  // const sender = ethers.getCreateAddress({
  //   from: FACTORY_ADDRESS,
  //   nonce: FACTORY_NONCE
  // })
  

  const AccountFactory = await ethers.getContractFactory("AccountFactory");
  let initCode = FACTORY_ADDRESS + AccountFactory.interface.encodeFunctionData("createAccount", [owner.address]).slice(2);

  let sender: string = "";

  try {
    await entryPoint.getSenderAddress(initCode);
  } catch(ex: any) {
    sender = "0x" + ex.data.data.slice(-40);
  }

  const code = await ethers.provider.getCode(sender);
  if (code !== "0x") {
    initCode = "0x";
  }
  
  console.log({sender});

  const Account = await ethers.getContractFactory("Account");

  // Send user Op
  const userOp = {
    sender, // smart account address
    nonce: await entryPoint.getNonce(sender, 0),
    initCode, // first 20 bytes are the address of the factory, the rest is the constructor arguments
    callData: Account.interface.encodeFunctionData("execute"),
    callGasLimit: 600_000,
    verificationGasLimit: 600_000,
    preVerificationGas: 150_000,
    maxFeePerGas: ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
    paymasterAndData: PAYMASTER_ADDRESS,
    signature: "0x" //await owner.signMessage(ethers.getBytes(ethers.id("message")))
  };

  // user the user op hash to sign it -> counter replay attack
  const userOpHash = await entryPoint.getUserOpHash(userOp);
  userOp.signature = await owner.signMessage(ethers.getBytes(userOpHash));

  const tx = await entryPoint.handleOps([userOp], owner.address);
  const receip = await tx.wait();
  console.log(receip);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});