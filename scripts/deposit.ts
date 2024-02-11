import { ethers } from "hardhat";
import { EntryPoint } from "../typechain-types/core";

const ENTRY_POINT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const entryPoint = await ethers.getContractAt("EntryPoint", ENTRY_POINT_ADDRESS) as EntryPoint;

  // Prefund the Paymaster so it can pay for the smart account
  await entryPoint.depositTo(PAYMASTER_ADDRESS, {value: ethers.parseEther(".2")});

  console.log("Deposit to paymaster worked!");
  console.log("Paymaster balance: ", await entryPoint.balanceOf(PAYMASTER_ADDRESS));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});