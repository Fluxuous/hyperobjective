// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from 'forge-std/Script.sol';
import {DevOpsTools} from 'foundry-devops/src/DevOpsTools.sol';

import {Factory} from '../src/Factory.sol';
import {Nft} from '../src/Nft.sol';

contract MintNft is Script {
  string public constant URI =
    'ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4';
  uint256 deployerKey;

  function run() external {
    address mostRecentlyDeployedFactory = DevOpsTools
      .get_most_recent_deployment('Factory', block.chainid);
    mintOnContract(mostRecentlyDeployedFactory);
  }

  function mintOnContract(address factoryAddress) public {
    vm.startBroadcast();
    Factory(factoryAddress).mint(URI, 'NFT', 'NFT', 18, 1000);
    vm.stopBroadcast();
  }
}
