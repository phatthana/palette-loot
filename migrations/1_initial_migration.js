const CoLoot = artifacts.require('CoLoot');

module.exports = async function (deployer) {
  await deployer.deploy(CoLoot);
};