import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const {expect} = chai;
const should = chai.should();

const Lottery = artifacts.require('./Lottery.sol');
const contractName = 'Lottery';

contract(contractName, () => {

    it('ticket contains of 5 items', () => {
        let contract;

        return Lottery.deployed()
            .then(instance => {
                contract = instance;
            })
            .then(() => contract.generateTicket())
            .then(() => contract.getTicket.call())
            .then(ticket => expect(ticket).to.have.length(5));
    });
});

contract(contractName, () => {

    it('error occurred when getting ticket before generating', () => {
        let contract;

        return Lottery.deployed()
            .then(instance => {
                contract = instance;
            })
            .then(() => contract.getTicket.call())
            .should.be.rejected;
    });
});

contract(contractName, () => {
    it('generating numbers should cost less', () => {
        const expectedTicketGeneratingCost = 40000;

        let contract;

        return Lottery.deployed()
            .then(instance => {
                contract = instance;
            })
            .then(() => contract.generateTicket())
            .then(({receipt: {gasUsed}}) => {
                console.log(gasUsed);
                expect(gasUsed).to.be.below(expectedTicketGeneratingCost)
            });
    });
});
