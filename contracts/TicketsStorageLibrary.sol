pragma solidity ^0.4.2;

library TicketsStorageLibrary {

    struct TicketsStorage {
        mapping (address => Ticket) tickets;
        address[] ownersIndex;
    }

    struct Ticket {
        uint[5] ticket;
        uint index;
        bool exists;
    }

    function addTicket(
        TicketsStorage storage tickets,
        uint[5] ticketData,
        address owner
    ) {
        if (!tickets.tickets[owner].exists) {
            tickets.ownersIndex.push(owner);
            tickets.tickets[owner].index = tickets.ownersIndex.length - 1;
            tickets.tickets[owner].exists = true;
        }

        tickets.tickets[owner].ticket = ticketData;
    }

    function ownerExists(
        TicketsStorage storage tickets,
        address owner
    ) constant returns (bool) {
        return tickets.tickets[owner].exists;
    }

    function getTicket(
        TicketsStorage storage tickets,
        address owner
    ) constant returns (uint[5]) {
        return tickets.tickets[owner].ticket;
    }
}
