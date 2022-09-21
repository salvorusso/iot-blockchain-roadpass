//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/** 
 * @title RoadPassChain
 * @dev Implements payment process of tolls and parking in smart cities
 */
contract RoadPassChain is ERC721Burnable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable public wallet;

    mapping (uint256 => string) private tokenIdToLocation;

    constructor(address payable _wallet) ERC721("RoadTicket", "NFT") {
        wallet = _wallet;
    }

    function entrance(address customer, string calldata gate) public onlyOwner returns (uint256)
    {
        _tokenIds.increment();
        uint256 ticketId = _tokenIds.current();
        _mint(customer, ticketId);
        tokenIdToLocation[ticketId] = gate;
        return ticketId;
    }

    function exit(uint256 ticketId, string calldata signedLocation) public payable
    {
        console.log("VALUE: ", msg.value);
        console.log("Entrance Gate: ", getLocation(ticketId));
        //Calcola costo
        uint256 cost = calculateCost(getLocation(ticketId), signedLocation);
        require(msg.value == cost, "Not enough ETH sent; check price!");
        wallet.transfer(msg.value); 
        burn(ticketId);
    }

    //this function gets a value from the map
    //If a value was not set the function will return the default value of 0.
    function getLocation(uint256 ticketId) public view returns (string memory) {
        return tokenIdToLocation[ticketId];
    }

    function calculateCost(string memory entrance, string memory signedExit) private returns (uint256 cost) {
        return 1;
    }
}
