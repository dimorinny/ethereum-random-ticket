import contract from 'truffle-contract';
import artifacts from '../../build/contracts/Lottery.json';
import {provideWeb3} from './web3';

let _cachedLottery;

function _provideLottery(web3) {
    if (_cachedLottery) {
        return _cachedLottery;
    }

    const lottery = contract(artifacts);
    lottery.setProvider(web3.currentProvider);

    _cachedLottery = lottery;

    return lottery;
}

export function provideLottery() {
    return provideWeb3()
        .then(_provideLottery)
}

export function provideDeployedLottery() {
    return provideLottery()
        .then(instance => instance.deployed());
}
