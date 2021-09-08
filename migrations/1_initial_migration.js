const Loot = artifacts.require('Loot');

module.exports = async function (deployer) {
  await deployer.deploy(Loot);
};