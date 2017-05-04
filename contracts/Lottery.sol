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

    function generateTicket() returns (uint[5]) {
        uint[5] memory ticketData = RandomLibrary.generateRandomItems(MAX_VALUE);
        tickets.addTicket(ticketData, msg.sender);
        return ticketData;
    }

    function getTicket() ticketExists constant returns (uint[5]) {
        return tickets.getTicket(msg.sender);
    }
}
