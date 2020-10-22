// var TRXMessages = artifacts.require("./TRXMessages.sol");
var TronexChain = artifacts.require("./TronexChain.sol");
//var TrxChain = artifacts.require("./TrxChain.sol");

module.exports = function (deployer) {
  // deployer.deploy(TRXMessages);
  deployer.deploy(TronexChain,
    "TQ9nCgHVgki3KjXUnC5Vdm3bcuNTQ4EVMY",
    "TMKKWtwErWh5EKNuLLVbSwGq8aKuTz4uUA"
  );
  //deployer.deploy(TrxChain);
};
