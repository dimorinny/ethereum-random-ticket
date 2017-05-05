pragma solidity ^0.4.2;

library TicketsStorageLibrary {

    struct TicketsStorage {
        mapping (address => Ticket) tickets;
        address[] ownersIndex;
    }

    struct Ticket {
        uint seed;
        uint index;
        bool exists;
    }

    function addTicket(
        TicketsStorage storage tickets,
        uint seed,
        address owner
    ) {
        if (!tickets.tickets[owner].exists) {
            tickets.ownersIndex.push(owner);
            tickets.tickets[owner].index = tickets.ownersIndex.length - 1;
            tickets.tickets[owner].exists = true;
        }

        tickets.tickets[owner].seed = seed;
    }

    function ownerExists(
        TicketsStorage storage tickets,
        address owner
    ) constant returns (bool) {
        return tickets.tickets[owner].exists;
    }

    function getSeed(
        TicketsStorage storage tickets,
        address owner
    ) constant returns (uint) {
        return tickets.tickets[owner].seed;
    }
}
