const RandomLibrary = artifacts.require('./RandomLibrary.sol');
const TicketsStorageLibrary = artifacts.require('./TicketsStorageLibrary.sol');
const Lottery = artifacts.require('./Lottery.sol');

module.exports = function (deployer) {
    deployer.deploy(RandomLibrary);
    deployer.deploy(TicketsStorageLibrary);

    deployer.link(RandomLibrary, Lottery);
    deployer.link(TicketsStorageLibrary, Lottery);

    deployer.deploy(Lottery);
};
