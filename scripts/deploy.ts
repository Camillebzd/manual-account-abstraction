import { ethers } from "hardhat";

async function main() {
  // Entry Point
  const ep = await ethers.deployContract("EntryPoint");
  await ep.waitForDeployment();
  console.log(`Entry Point deployed to ${ep.target}`);

  // Account Factory
  const af = await ethers.deployContract("AccountFactory");
  await af.waitForDeployment();
  console.log(`Account Factory deployed to ${af.target}`);

  // Paymaster
  const pm = await ethers.deployContract("Paymaster");
  await pm.waitForDeployment();
  console.log(`Paymaster deployed to ${pm.target}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
