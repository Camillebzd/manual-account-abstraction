import { ethers } from "hardhat";

const ACCOUNT_ADDR = "0x86d3943bec95b8d0a70b0203cebf884d3674938d";

async function main() {
  const account = await ethers.getContractAt("Account", ACCOUNT_ADDR);
  const count = await account.count();
  console.log("counter:", count);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
