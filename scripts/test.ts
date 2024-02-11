import { ethers } from "hardhat";

const ACCOUNT_ADDR = "0xCafac3dD18aC6c6e92c921884f9E4176737C052c";
const ENTRY_POINT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const account = await ethers.getContractAt("Account", ACCOUNT_ADDR);
  const count = await account.count();
  console.log("counter:", count);
  console.log("account balance:", await ethers.provider.getBalance(ACCOUNT_ADDR));

  const entryPoint = await ethers.getContractAt("EntryPoint", ENTRY_POINT_ADDRESS);
  console.log("account balance on Entry Point:", await entryPoint.balanceOf(ACCOUNT_ADDR));
  console.log("paymaster on Entry Point:", await entryPoint.balanceOf(PAYMASTER_ADDRESS));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
