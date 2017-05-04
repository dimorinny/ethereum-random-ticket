import Web3 from 'web3';
import onLoad from '../util/load';

let _cachedWeb3;

function _provideWeb3() {
    let result;

    if (_cachedWeb3) {
        return _cachedWeb3;
    }

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
        console.warn(`
            Using web3 detected from external source.
            http://truffleframework.com/tutorials/truffle-and-metamask
        `);
        result = new Web3(window.web3.currentProvider);
    } else if (__DEV__) {
        console.warn(`
            No web3 detected. Falling back to http://localhost:8545. 
            More info here: http://truffleframework.com/tutorials/truffle-and-metamask
        `);
        result = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    } else {
        throw new Error(`
            No web3 detected. Fall back is not enabled for production build.
        `);
    }

    _cachedWeb3 = result;

    return result;
}

export function provideWeb3() {
    return onLoad()
        .then(_ => _provideWeb3());
}

export function currentAccount() {
    return provideWeb3()
        .then(instance =>
            new Promise((resolve, reject) => {
                instance.eth.getAccounts((error, accounts) => {
                    if (error) {
                        reject();
                    } else {
                        resolve(accounts[0]);
                    }
                });
            }));
}
