// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

import {Nft} from './Nft.sol';

contract Factory is Ownable {
  error TokenUriNotFound();

  event Mint(address indexed _from, address indexed _to, uint256 _tokenId);

  mapping(uint256 tokenId => string tokenUri) private _tokenIdToUri;
  mapping(uint256 tokenId => address tokenAddress) private _tokenIdToAddress;

  uint256 private _tokenCounter;

  constructor() Ownable(msg.sender) {
    _tokenCounter = 0;
  }

  function mint(
    string memory tokenUri_,
    string memory name_,
    string memory symbol_,
    uint8 decimals_,
    uint256 maxTotalSupplyERC721_
  ) public returns (address) {
    Nft nft = new Nft(
      name_,
      symbol_,
      decimals_,
      maxTotalSupplyERC721_,
      msg.sender
    );

    emit Mint(address(nft), msg.sender, _tokenCounter);

    _tokenIdToUri[_tokenCounter] = tokenUri_;
    _tokenIdToAddress[_tokenCounter] = address(nft);
    _tokenCounter = _tokenCounter + 1;
    return address(nft);
  }

  function tokenUri(uint256 tokenId) public view returns (string memory) {
    return _tokenIdToUri[tokenId];
  }

  function getTokenCounter() public view returns (uint256) {
    return _tokenCounter;
  }
}
