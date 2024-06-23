// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from 'forge-std/Script.sol';
import {console} from 'forge-std/console.sol';

import {Factory} from '../src/Factory.sol';

contract DeployFactory is Script {
  uint256 public deployerKey;

  function run() external returns (Factory) {
    deployerKey = vm.envUint('PRIVATE_KEY');
    vm.startBroadcast(deployerKey);
    Factory basicNft = new Factory();
    vm.stopBroadcast();
    return basicNft;
  }
}
