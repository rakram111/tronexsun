var TronexChain = artifacts.require("./TronexChain.sol");

module.exports = function (deployer) {
  // deployer.deploy(TRXMessages);
  deployer.deploy(TronexChain,
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TMKKWtwErWh5EKNuLLVbSwGq8aKuTz4uUA",
    "TQ8gshbEasKnUqXU8zZ43U9VkgTwcehkXF",
    "TXMd8KNUrmJAVSooLnjpmqn2KozredxL5m"
  );
  //deployer.deploy(TrxChain);
};
