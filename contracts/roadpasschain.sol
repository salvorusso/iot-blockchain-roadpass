//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract RoadPassChain {

    struct Totem {
        string location;
        uint16 km;
    }

    mapping(address => Totem) _totems;

    function registerTotem(address totem, string memory location, uint16 km) public {
        _totems[totem] = Totem(location, km);
    }

    function getLocation(address gate) public view returns (Totem memory) {
        return _totems[gate];
    }

    function unitaryPrice() public pure returns (uint256) {
        return 748096311755090 wei; // ~ 1 $ * 10Km
    }
}

/** 
 * @title RoadPassTotem
 * @dev Uniquely associated with the motorway columns, implements payment methods
 */
contract RoadPassTotem is RoadPassChain {
    address payable public _wallet; //Wallet of the motorway company
    RoadPassChain _company;
    RoadPassTicket _ticket; //Contract of NFTs

    constructor(address payable wallet, string memory location, uint16 km, address ticket, address company) {
        _wallet = wallet;
        _company = RoadPassChain(company);
        _ticket = RoadPassTicket(ticket);
        //Register the totem
        _company.registerTotem(address(this), location, km);
    }

    function entrance(address to) public returns (uint256) {
        return _ticket.createTicket(address(this), to);
    }

    function exit(uint256 ticketId) external payable {
        uint256 cost = calculateCost(_ticket.entranceGate(ticketId));
        console.log("Sent ETH: ", msg.value);
        console.log("Cost: ", cost);
        require(msg.value == cost, "Wrong ETH amount for trx!");
        _ticket.burnTicket(address(this), ticketId);
        _wallet.transfer(msg.value);
    }

    function calculateCost(address entranceGate) public view returns (uint256){
        Totem memory entranceTotem = _company.getLocation(entranceGate);
        Totem memory exitTotem = _company.getLocation(address(this));
        uint16 km = exitTotem.km - entranceTotem.km;
        return km * _company.unitaryPrice();
    }

}

/** 
 * @title RoadPassTicket
 * @dev Unique tickets that guarantee the right to transit
 */
contract RoadPassTicket is ERC721Burnable, Ownable, RoadPassChain {
    address payable public wallet; //Wallet of the motorway company
    using Counters for Counters.Counter; //Counter for NFTs
    Counters.Counter private _tokenIds;
    RoadPassChain _company;

    mapping(uint256 => address) private _entranceGates;
    mapping(uint256 => address) private _exitGates;

    constructor(address payable _wallet, address company) ERC721("Ticket", "RoadPassChain") {
        wallet = _wallet;
        _company = RoadPassChain(company);
    }

    function createTicket(address gate, address to) public returns (uint256) {   
        console.log("Creating a new ticket...");
        string memory location = _company.getLocation(gate).location;
        console.log("Creating ticket at ", location);   
        require(bytes(location).length > 0, "Totem not exists!");
        _tokenIds.increment();
        uint256 ticketId = _tokenIds.current();
        _mint(to, ticketId);
        _entranceGates[ticketId] = gate;
        return ticketId;
    }

    function burnTicket(address gate, uint256 ticketId) public {
        console.log("Entrance Gate: ", entranceGate(ticketId));
        console.log("Exit Gate: ", gate);
        setExitGate(ticketId, gate);
        burn(ticketId);
    }

    function burn(uint256 tokenId) public override {
        require(_isApprovedOrOwner(tx.origin, tokenId), "ERC721: caller is not token owner nor approved");
        _burn(tokenId);
    }

    function setEntranceGate(uint256 tokenId, address gate) private {
        _entranceGates[tokenId] = gate;
    }

    function setExitGate(uint256 tokenId, address gate) private {
         _exitGates[tokenId] = gate;
    }

    function entranceGate(uint256 tokenId) public view returns (address) {
        return _entranceGates[tokenId];
    }

    function exitGate(uint256 tokenId) public view returns (address) {
        return _exitGates[tokenId];
    }
}