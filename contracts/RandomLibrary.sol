pragma solidity ^0.4.2;

library RandomLibrary {

    function generateRandomItems(uint before) constant returns (uint[5]) {
        uint[5] memory result;
        uint currentSeed = generateSeed();

        for (uint i = 0; i < 5; i++) {
            result[i] = currentSeed % before + 1;
            currentSeed = lcg(currentSeed);
        }

        return result;
    }

    function lcg(uint seed) constant returns (uint) {
        return seed * 16807 & 2147483647;
    }

    function generateSeed() constant returns (uint) {
        return (uint(sha3(block.blockhash(block.number - 1), msg.sender)));
    }
}
