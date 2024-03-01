import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("Marg", ["0xcD34E2C022BaF0Fb341785D9774f64133af65cda"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});