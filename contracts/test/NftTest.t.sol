// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Factory} from '../src/Factory.sol';
import {Nft} from '../src/Nft.sol';
import {Test, console} from 'forge-std/Test.sol';
import {StdCheats} from 'forge-std/StdCheats.sol';
import {MintNft} from '../script/Interactions.s.sol';

contract NftTest is StdCheats, Test {
  string constant NFT_NAME = 'NFT';
  string constant NFT_SYMBOL = 'NFT';

  Nft public nft;
  Factory public factory;

  address public deployerAddress;

  string public constant URI =
    'ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4';
  address public constant USER = address(1);

  function setUp() public {
    factory = new Factory();
    address token = factory.mint(URI, NFT_NAME, NFT_SYMBOL, 18, 1000);
    nft = Nft(token);
  }

  function testInitializedCorrectly() public view {
    assert(
      keccak256(abi.encodePacked(nft.name())) ==
        keccak256(abi.encodePacked((NFT_NAME)))
    );
    assert(
      keccak256(abi.encodePacked(nft.symbol())) ==
        keccak256(abi.encodePacked((NFT_SYMBOL)))
    );
  }

  function testCanMintAndHaveABalance() public {
    vm.prank(USER);
    factory.mint(URI, NFT_NAME, NFT_SYMBOL, 18, 1000);
    assert(nft.balanceOf(USER) == 0);
  }

  function testTokenURIIsCorrect() public {
    vm.prank(USER);
    factory.mint(URI, NFT_NAME, NFT_SYMBOL, 18, 1000);

    assert(
      keccak256(abi.encodePacked(nft.tokenURI(0))) ==
        keccak256(abi.encodePacked('https://ipfs.io/ipfs/0'))
    );
  }

  function testMintWithScript() public {
    uint256 startingTokenCount = factory.getTokenCounter();
    factory.mint(URI, NFT_NAME, NFT_SYMBOL, 18, 1000);
    assert(factory.getTokenCounter() == startingTokenCount + 1);
  }
}
