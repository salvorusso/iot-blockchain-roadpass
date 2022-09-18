//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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
    address payable wallet;

    constructor(address payable _wallet) ERC721("RoadTicket", "NFT") {
        wallet = _wallet;
    }

    function entrance(address customer) public onlyOwner returns (uint256)
    {
        _tokenIds.increment();
        //-_entranceGate = gate;
        uint256 ticketId = _tokenIds.current();
        _mint(customer, ticketId);

        return ticketId;
    }

    function exit(uint256 ticketId) public payable
    {
        //Calcola costo
        require(msg.value >= 10, "Not enough ETH sent; check price!");
        wallet.transfer(msg.value); 
        burn(ticketId);
    }
}
