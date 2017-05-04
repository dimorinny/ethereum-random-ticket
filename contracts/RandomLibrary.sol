pragma solidity ^0.4.2;

library RandomLibrary {

    function generateRandomItems(uint before) constant returns (uint[5]) {
        uint[5] memory result;

        for (uint i = 0; i < 5; i++) {
            result[i] = generateRandom(i) % before + 1;
        }

        return result;
    }

    function generateRandom(uint blockHashOffset) constant returns (uint) {
        return (uint(sha3(block.blockhash(block.number - blockHashOffset - 1), msg.sender)));
    }
}
