pragma solidity ^0.4.2;

import "./RandomLibrary.sol";
import "./TicketsStorageLibrary.sol";

contract Lottery {

    uint constant MAX_VALUE = 75;

    using TicketsStorageLibrary for TicketsStorageLibrary.TicketsStorage;

    TicketsStorageLibrary.TicketsStorage private tickets;

    address public owner = msg.sender;

    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _;
    }

    modifier ticketExists {
        if (!tickets.ownerExists(msg.sender)) throw;
        _;
    }

    function generateTicket() {
        tickets.addTicket(
            RandomLibrary.generateSeed(),
            msg.sender
        );
    }

    function getTicket() ticketExists constant returns (uint[5]) {
        return RandomLibrary.generateRandomItems(
            tickets.getSeed(msg.sender),
            MAX_VALUE
        );
    }
}
