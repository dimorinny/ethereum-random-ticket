import {currentAccount} from '../contract/web3';
import {mapUint} from '../util/mapping';
import {provideDeployedLottery} from '../contract/lottery';

export function loadTicket() {
    let address;

    return currentAccount()
        .then(account => {
            address = account;
        })
        .then(provideDeployedLottery)
        .then(instance => instance.getTicket.call({from: address}))
        .then(tickets => tickets.map(mapUint));
}

export function generateTicket(actions) {
    let address;

    return currentAccount()
        .then(account => {
            address = account;
        })
        .then(provideDeployedLottery)
        .then(instance => instance.generateTicket({from: address}))
        .then(actions.load);
}

export function getAccount() {
    let address;

    return currentAccount()
        .then(account => {
            address = account;
        })
        .then(provideDeployedLottery)
        .then(_ => address);
}
